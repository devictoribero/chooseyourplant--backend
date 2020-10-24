import { TaskStatus } from "./TaskStatus";
import { TaskType } from "./TaskType";

export class TaskCriteria {
  private from?: Date 
  private to?: Date 
  private type?: TaskType 
  private status?: TaskStatus 

  constructor(
    from?: Date,
    to?: Date,
    type?: TaskType,
    status?: TaskStatus,
  ) {
    this.from = from;
    this.to = to;
    this.type = type;
    this.status = status;
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
}