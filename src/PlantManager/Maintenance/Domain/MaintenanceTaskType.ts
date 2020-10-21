import { StringValueObject } from "../../../Shared/Domain/ValueObject/StringValueObject";

enum TASK_TYPE {
  WATERING = 'watering',
  FERTILIZATION = 'fertilization'
}

export class MaintenanceTaskType extends StringValueObject {
  constructor(type: TASK_TYPE) {
    super(type);
  }
}
