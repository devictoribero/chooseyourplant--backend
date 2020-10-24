import { MaintenanceTaskRepository } from "../Domain/MaintenanceTaskRepository";
import { MaintenanceTask } from "../Domain/MaintenanceTask";
import { TaskAlreadyExists } from "../Domain/TaskAlreadyExists";
import MongoMaintenanceTaskModel from './MongoMaintenanceTaskModel'
import { Nullable } from "../../../Shared/Domain/Nullable";
import { GeneralError } from "../../../Shared/Domain/GeneralError";
import { TimeInterval } from "../../../Shared/Domain/TimeInterval";
import { Document } from "mongoose";

const MONGODB_ID_ALREADY_EXISTING_ERROR_CODE = 11000

export class MongoMaintenanceTaskRepository implements MaintenanceTaskRepository {
  async save(task: MaintenanceTask, transaction: any): Promise<void> {
    await MongoMaintenanceTaskModel
      .init()
      .then(() => 
        MongoMaintenanceTaskModel.create(
          [task.toPrimitives()],
          {session: transaction}
        )
      )
      .catch((error) => {
        if (error.code === MONGODB_ID_ALREADY_EXISTING_ERROR_CODE) {
          throw new TaskAlreadyExists(task.getId().toString());
        }
        throw new GeneralError("Tried to create a task");
      });
  }

  async find(id: string): Promise<Nullable<MaintenanceTask>> {
    return MongoMaintenanceTaskModel
      .init()
      .then(() => MongoMaintenanceTaskModel.findOne({ id }).lean())
      .then((doc: any) => doc ? MaintenanceTask.fromPrimitives({...doc, id}) : null)
      .catch(err => { throw new Error(err) })
  }

  async search(
    interval: TimeInterval,
    status?: String,
    type?: String
  ): Promise<Nullable<Array<MaintenanceTask>>> {
    return MongoMaintenanceTaskModel
      .init()
      .then(() => 
        MongoMaintenanceTaskModel
          .find()
          .where('interval').equals(interval)
          .where('status').equals(status)
          .where('type').equals(type)
      )
      .then((docs: Document[]) => docs
        ? docs.map((doc: any) => MaintenanceTask.fromPrimitives({...doc}))
        : null
      )
      .catch(err => { throw new Error(err) })
  }
}
