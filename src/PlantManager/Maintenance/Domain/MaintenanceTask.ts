import { Plant } from "../../Plants/Domain/Plant";
import { MaintenanceTaskId } from "./MaintenanceTaskId";
import { MaintenanceTaskType } from "./MaintenanceTaskType";
import {
  MaintenanceTaskStatus,
  TASK_STATUS_PENDING
} from "./MaintenanceTaskStatus";

export class MaintenanceTask {
  private id: MaintenanceTaskId;
  private date: Date;
  private type: MaintenanceTaskType;
  private plant: Plant;
  private status: MaintenanceTaskStatus;

  constructor(
    id: MaintenanceTaskId,
    date: Date,
    type: MaintenanceTaskType,
    plant: Plant,
    status?: MaintenanceTaskStatus
  ) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.plant = plant;
    this.status = status || new MaintenanceTaskStatus(TASK_STATUS_PENDING)
  }

  public getId(): MaintenanceTaskId {
    return this.id;
  }

  public getDate(): Date {
    return this.date;
  }

  public getType(): MaintenanceTaskType {
    return this.type;
  }

  public getPlant(): Plant {
    return this.plant;
  }

  public getStatus(): MaintenanceTaskStatus {
    return this.status;
  }

  public toPrimitives() {
    return {
      id: this.getId(),
      date: this.getDate().toISOString(),
      type: this.getType(),
      plant: this.getPlant().toPrimitives(),
      status: this.getStatus(),
    }
  }

  static fromPrimitives(data: {
    id: string,
    date: Date,
    type: string,
    plant: any,
    status: string,
  }) {
    return new MaintenanceTask(
      new MaintenanceTaskId(data.id),
      new Date(data.date),
      new MaintenanceTaskType(data.type),
      Plant.fromPrimitives(data.plant),
      new MaintenanceTaskStatus(data.status),
    )
  }
}