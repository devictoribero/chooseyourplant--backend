import { Plant } from "../../Plants/Domain/Plant";
import { TaskId } from "./TaskId";
import { TaskType } from "./TaskType";
import {
  TaskStatus,
  TASK_STATUS_PENDING
} from "./TaskStatus";

export class Task {
  private id: TaskId;
  private date: Date;
  private type: TaskType;
  private plant: Plant;
  private status: TaskStatus;

  constructor(
    id: TaskId,
    date: Date,
    type: TaskType,
    plant: Plant,
    status?: TaskStatus
  ) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.plant = plant;
    this.status = status || new TaskStatus(TASK_STATUS_PENDING)
  }

  public getId(): TaskId {
    return this.id;
  }

  public getDate(): Date {
    return this.date;
  }

  public getType(): TaskType {
    return this.type;
  }

  public getPlant(): Plant {
    return this.plant;
  }

  public getStatus(): TaskStatus {
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
    return new Task(
      new TaskId(data.id),
      new Date(data.date),
      new TaskType(data.type),
      Plant.fromPrimitives(data.plant),
      new TaskStatus(data.status),
    )
  }
}