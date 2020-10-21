import { StringValueObject } from "../../../Shared/Domain/ValueObject/StringValueObject";

export enum TASK_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export class MaintenanceTaskStatus extends StringValueObject {
  constructor(type: TASK_STATUS) {
    super(type);
  }
}
