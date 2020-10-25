import { TaskRepository } from "../../Domain/TaskRepository";
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

export class CompleteTask {
  private repository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async run(request: { id: string }): Promise<void> {
    const taskToComplete = await this.repository.findOne(new TaskId(request.id))
    if (!taskToComplete) {
      throw new Error('Task not foudn')
    }

    taskToComplete.markAsCompleted()
    return this.repository.save(taskToComplete);
  }
}
