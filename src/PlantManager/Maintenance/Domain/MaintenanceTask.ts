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
}