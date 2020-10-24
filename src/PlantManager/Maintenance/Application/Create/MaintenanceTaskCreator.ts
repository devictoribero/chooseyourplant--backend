import { MaintenanceTaskRepository } from "../../Domain/MaintenanceTaskRepository";
import { CreateMaintenanceTaskRequest } from "./CreateMaintenanceTaskRequest";
import { MaintenanceTask } from "../../Domain/MaintenanceTask"
import { MaintenanceTaskId } from "../../Domain/MaintenanceTaskId"
import {
  MaintenanceTaskType,
  TASK_TYPE_WATERING,
  TASK_TYPE_FERTILIZATION
} from "../../Domain/MaintenanceTaskType"
import { Plant } from "../../../Plants/Domain/Plant";
import {
  MaintenanceTaskStatus,
  TASK_STATUS_PENDING,
  TASK_STATUS_COMPLETED
} from "../../Domain/MaintenanceTaskStatus"

export const TASKS_TYPES = {
  'WATERING': TASK_TYPE_WATERING,
  'FERTILIZATION': TASK_TYPE_FERTILIZATION,
}

export const TASKS_STATUS = {
  'PENDING': TASK_STATUS_PENDING,
  'COMPLETED': TASK_STATUS_COMPLETED,
}

export class MaintenanceTaskCreator {
  private repository;

  constructor(repository: MaintenanceTaskRepository) {
    this.repository = repository;
  }

  async run(request: CreateMaintenanceTaskRequest): Promise<void> {
    return this.repository.save(
      new MaintenanceTask(
        new MaintenanceTaskId(request.id),
        request.date,
        new MaintenanceTaskType(request.type),
        Plant.fromPrimitives(request.plant),
        new MaintenanceTaskStatus(request.status)
      )
    );
  }
}
