import { TaskRepository } from "../../Domain/TaskRepository";
import { TaskEraserRequest } from "./TaskEraserRequest";

export class TaskEraser {
  private repository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async run(request: TaskEraserRequest): Promise<void> {
    return this.repository.remove(request.id);
  }
}
