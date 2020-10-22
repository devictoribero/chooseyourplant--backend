import { MaintenanceTaskRepository } from "../Domain/MaintenanceTaskRepository";
import { MaintenanceTask } from "../Domain/MaintenanceTask";
import { MaintenanceTaskId } from "../Domain/MaintenanceTaskId";
import { MaintenanceTaskType } from "../Domain/MaintenanceTaskType";
import { MaintenanceTaskStatus } from "../Domain/MaintenanceTaskStatus";
import { TaskAlreadyExists } from "../Domain/TaskAlreadyExists";
import { Plant } from "../../Plants/Domain/Plant";
import MongoMaintenanceTaskModel from './MongoMaintenanceTaskModel'
import { Nullable } from "../../../Shared/Domain/Nullable";
import { GeneralError } from "../../../Shared/Domain/GeneralError";
import { TimeInterval } from "../../../Shared/Domain/TimeInterval";

const MONGODB_ID_ALREADY_EXISTING_ERROR_CODE = 11000

export class MongoMaintenanceTaskRepository implements MaintenanceTaskRepository {
  async save(task: MaintenanceTask): Promise<void> {
    await MongoMaintenanceTaskModel
      .init()
      .then(() => 
        MongoMaintenanceTaskModel.create(() => this.fromEntityToDoc(task))
      )
      .catch((error) => {
        if (error.code === MONGODB_ID_ALREADY_EXISTING_ERROR_CODE) {
          throw new TaskAlreadyExists(task.getId().toString());
        }
        throw new GeneralError("Tried to create a task");
      });
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
      .then(docs => docs ? docs.map(this.fromDocToEntity) : null)
      .catch(err => { throw new Error(err) })
  }

  /*
   * Maps from a MongoDB Document to the Plant Entity
   */
  private fromDocToEntity(doc: any) : MaintenanceTask {
    return new MaintenanceTask(
      new MaintenanceTaskId(doc.id),
      new Date(doc.date),
      new MaintenanceTaskType(doc.type),
      Plant.createFromPrimitives(doc.plant),
      new MaintenanceTaskStatus(doc.status),
    )
  }

  /*
   * Maps from an Entity to a MongoDB Document
   */
  private fromEntityToDoc(task: MaintenanceTask): Object {
    return {
      id: task.getId(),
      date: task.getDate(),
      type: task.getType(),
      plant: task.getPlant(),
      status: task.getStatus()
    }
  }
}
