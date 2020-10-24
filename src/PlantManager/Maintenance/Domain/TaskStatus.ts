import { StringValueObject } from "../../../Shared/Domain/ValueObject/StringValueObject";

export const TASK_STATUS_PENDING = 'PENDING'
export const TASK_STATUS_COMPLETED = 'COMPLETED'

export class TaskStatus extends StringValueObject {
  constructor(type: string) {
    super(type);
    this.ensureStatusHasCorrectValue(type)
  }

  private ensureStatusHasCorrectValue(type: string) : void {
    if (type !== TASK_STATUS_PENDING && type !== TASK_STATUS_COMPLETED) {
      throw new Error('Invalid task status')
    }
  }
}
