import { TaskRepository } from "../Domain/TaskRepository";
import { Task } from "../Domain/Task";
import { TaskAlreadyExists } from "../Domain/TaskAlreadyExists";
import MongoTaskModel from './MongoTaskModel'
import { Nullable } from "../../../Shared/Domain/Nullable";
import { GeneralError } from "../../../Shared/Domain/GeneralError";
import { TaskCriteria } from "../Domain/TaskCriteria";

const MONGODB_ID_ALREADY_EXISTING_ERROR_CODE = 11000

export class MongoTaskRepository implements TaskRepository {
  async save(task: Task, transaction: any): Promise<void> {
    await MongoTaskModel
      .init()
      .then(() => 
        MongoTaskModel.create([task.toPrimitives()], {session: transaction})
      )
      .catch((error) => {
        if (error.code === MONGODB_ID_ALREADY_EXISTING_ERROR_CODE) {
          throw new TaskAlreadyExists(task.getId().toString());
        }
        throw new GeneralError("Tried to create a task");
      });
  }

  async find(id: string): Promise<Nullable<Task>> {
    return MongoTaskModel
      .init()
      .then(() => MongoTaskModel.findOne({ id }).lean())
      .then((doc: any) => doc ? Task.fromPrimitives({...doc, id}) : null)
      .catch(err => { throw new Error(err) })
  }

  async search(criteria: TaskCriteria): Promise<Nullable<Array<Task>>> {
    const hasFilters = Boolean(
      criteria.getFrom() ||
      criteria.getTo() ||
      criteria.getType()?.toString() ||
      criteria.getStatus()?.toString()
    )

    const query = hasFilters
      ? MongoTaskModel.find({
        from: criteria.getFrom(),
        to: criteria.getTo(),
        type: criteria.getType()?.toString(),
        status: criteria.getStatus()?.toString(),
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

  async remove(id: string): Promise<void> {
    return MongoTaskModel
      .init()
      .then(async() => { await MongoTaskModel.findOneAndRemove({id}) })
      .catch(err => { throw new Error(err) })
  }
}
