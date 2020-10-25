import { TaskStatus } from "./TaskStatus";
import { TaskType } from "./TaskType";
import { PlantId } from "../../Plants/Domain/PlantId";

export class TaskCriteria {
  private from?: Date 
  private to?: Date 
  private type?: TaskType 
  private status?: TaskStatus
  private plantId?: PlantId

  constructor(
    from?: Date,
    to?: Date,
    type?: TaskType,
    status?: TaskStatus,
    plantId?: PlantId
  ) {
    this.from = from;
    this.to = to;
    this.type = type;
    this.status = status;
    this.plantId = plantId;
  }

  public getFrom(): Date | undefined {
    return this.from;
  }

  public getTo(): Date | undefined {
    return this.to;
  }
  
  public getType(): TaskType | undefined {
    return this.type;
  }

  public getStatus(): TaskStatus | undefined {
    return this.status
  }

  public getPlantId(): PlantId | undefined {
    return this.plantId
  }

  static create(data: {
    from?: Date,
    to?: Date,
    type?: string,
    status?: string,
    plantId?: string
  }): TaskCriteria {
    return new TaskCriteria(
      data.from,
      data.to,
      data.type ? new TaskType(data.type) : undefined,
      data.status ? new TaskStatus(data.status) : undefined,
      data.plantId ? new PlantId(data.plantId) : undefined
    )
  }

  public toPrimitives(): any {
    return {
      from: this.getFrom(), 
      to: this.getTo(), 
      type: this.getType()?.toString(), 
      status: this.getStatus()?.toString(), 
      plantId: this.getPlantId()?.toString(), 
    }
  }
}