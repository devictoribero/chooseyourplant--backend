import { TaskRepository } from "../../Domain/TaskRepository";
import { CreateTaskRequest } from "./CreateTaskRequest";
import { Task } from "../../Domain/Task"
import { TaskId } from "../../Domain/TaskId"
import {
  TaskType,
  TASK_TYPE_WATERING,
  TASK_TYPE_FERTILIZATION
} from "../../Domain/TaskType"
import { Plant } from "../../../Plants/Domain/Plant";
import {
  TaskStatus,
  TASK_STATUS_PENDING,
  TASK_STATUS_COMPLETED
} from "../../Domain/TaskStatus"

export const TASKS_TYPES = {
  'WATERING': TASK_TYPE_WATERING,
  'FERTILIZATION': TASK_TYPE_FERTILIZATION,
}

export const TASKS_STATUS = {
  'PENDING': TASK_STATUS_PENDING,
  'COMPLETED': TASK_STATUS_COMPLETED,
}

export class TaskCreator {
  private repository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async run(request: CreateTaskRequest): Promise<void> {
    return this.repository.save(
      new Task(
        new TaskId(request.id),
        request.date,
        new TaskType(request.type),
        Plant.fromPrimitives(request.plant),
        new TaskStatus(request.status)
      )
    );
  }
}
