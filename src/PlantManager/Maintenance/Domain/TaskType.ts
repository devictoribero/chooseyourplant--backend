import { StringValueObject } from "../../../Shared/Domain/ValueObject/StringValueObject";

export const TASK_TYPE_WATERING = 'WATERING'
export const TASK_TYPE_FERTILIZATION = 'FERTILIZATION'

export class TaskType extends StringValueObject {
  constructor(type: string) {
    super(type);
    this.ensureTypeHasCorrectValue(type)
  }

  private ensureTypeHasCorrectValue(type: string) : void {
    if (type !== TASK_TYPE_WATERING && type !== TASK_TYPE_FERTILIZATION) {
      throw new Error('Invalid task type')
    }
  }
}
