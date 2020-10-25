import { TaskId } from "../../Domain/TaskId";
import { TaskRepository } from "../../Domain/TaskRepository";

export class DeleteTask {
  private repository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async run(request: {
    id: string,
  }): Promise<void> {
    return this.repository.remove(new TaskId(request.id));
  }
}
