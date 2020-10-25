import { TaskRepository } from "../Domain/TaskRepository";
import { Task } from "../Domain/Task";
import { TaskAlreadyExists } from "../Domain/TaskAlreadyExists";
import MongoTaskModel from './MongoTaskModel'
import { Nullable } from "../../../Shared/Domain/Nullable";
import { GeneralError } from "../../../Shared/Domain/GeneralError";
import { TaskCriteria } from "../Domain/TaskCriteria";
import { TaskId } from "../Domain/TaskId";

const MONGODB_ID_ALREADY_EXISTING_ERROR_CODE = 11000

export class MongoTaskRepository implements TaskRepository {
  async save(task: Task, transaction: any): Promise<void> {
    await MongoTaskModel
      .init()
      .then(() => 
        MongoTaskModel.updateOne(
          {id: task.getId().toString()},
          task.toPrimitives(),
          {session: transaction, upsert: true})
      )
      .catch((error) => {
        if (error.code === MONGODB_ID_ALREADY_EXISTING_ERROR_CODE) {
          throw new TaskAlreadyExists(task.getId().toString());
        }
        throw new GeneralError("Tried to create a task");
      });
  }

  async find(id: TaskId): Promise<Nullable<Task>> {
    return MongoTaskModel
      .init()
      .then(() => MongoTaskModel.findOne({ id }).lean())
      .then((doc: any) => doc ? Task.fromPrimitives({...doc, id}) : null)
      .catch(err => { throw new Error(err) })
  }

  async search(criteria: TaskCriteria): Promise<Nullable<Array<Task>>> {
    const from: Date|undefined = criteria.getFrom()
    const to: Date|undefined = criteria.getTo()
    const type: string|undefined = criteria.getType()?.toString()
    const status: string|undefined = criteria.getStatus()?.toString()
    const plantId: string|undefined = criteria.getPlantId()?.toString()
    const hasFilters = Boolean(from || to || type || status || plantId)

    const hasFilterTasksFromDate = from && !to
    const hasFilterTasksToDate = to && !from
    const hasFilterTasksInPeriod = from && to

    const query = hasFilters
      ? MongoTaskModel.find({
        ...(hasFilterTasksFromDate && {date: {$gte: from}}),
        ...(hasFilterTasksToDate && {date: {$lte: to}}),
        ...(hasFilterTasksInPeriod && {date: {$gte: from, $lte: to}}),
        ...(type && {type: type}),
        ...(status && {status: status}),
        ...(plantId && {'plant.id': plantId}),
      })
      : MongoTaskModel.find()

    return MongoTaskModel
      .init()
      .then(() => query.lean())
      .then((docs: any[]) => docs
        ? docs.map((doc: any) => Task.fromPrimitives({...doc}))
        : null
      )
      .catch(err => { throw new Error(err) })
  }

  async remove(id: TaskId): Promise<void> {
    return MongoTaskModel
      .init()
      .then(async() => { await MongoTaskModel.findOneAndRemove({id}) })
      .catch(err => { throw new Error(err) })
  }
}
