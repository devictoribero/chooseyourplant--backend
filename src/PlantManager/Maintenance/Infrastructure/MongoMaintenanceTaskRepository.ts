import { MaintenanceTaskRepository } from "../Domain/MaintenanceTaskRepository";
import { MaintenanceTask } from "../Domain/MaintenanceTask";
import { MaintenanceTaskId } from "../Domain/MaintenanceTaskId";
import { MaintenanceTaskType } from "../Domain/MaintenanceTaskType";
import { MaintenanceTaskStatus } from "../Domain/MaintenanceTaskStatus";
import { Plant } from "../../Plants/Domain/Plant";
import MongoMaintenanceTaskModel from './MongoMaintenanceTaskModel'
import { Nullable } from "../../../Shared/Domain/Nullable";
import { TimeInterval } from "../../../Shared/Domain/TimeInterval";

export class MongoMaintenanceTaskRepository implements MaintenanceTaskRepository {
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
  private fromEntityToDoc(plant: Plant): Object {
    return {
      id: plant.getId(),
      nickname: plant.getNickname(),
      maintenance: plant.getMaintenance(),
      imageUrl: plant.getImageUrl()
    }
  }
}
