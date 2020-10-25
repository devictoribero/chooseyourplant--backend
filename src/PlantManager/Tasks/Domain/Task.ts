import { Plant } from "../../Plants/Domain/Plant";
import { TaskId } from "./TaskId";
import { TaskType } from "./TaskType";
import { TaskStatus, TASK_STATUS_COMPLETED } from "./TaskStatus";

export class Task {
  private id: TaskId;
  private date: Date;
  private type: TaskType;
  private status: TaskStatus;
  private plant: Plant;

  constructor(
    id: TaskId,
    date: Date,
    type: TaskType,
    status: TaskStatus,
    plant: Plant,
  ) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.status = status
    this.plant = plant;
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
      id: this.getId().toString(),
      date: this.getDate().toISOString(),
      type: this.getType().toString(),
      status: this.getStatus().toString(),
      plant: this.getPlant().toPrimitives(),
    }
  }

  public markAsCompleted(): void {
    this.status = new TaskStatus(TASK_STATUS_COMPLETED)
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
      new TaskStatus(data.status),
      Plant.fromPrimitives(data.plant),
    )
  }
}