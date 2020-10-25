import { TaskRepository } from "../../Domain/TaskRepository";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { SearchTasksRequest } from './SearchTasksRequest'
import { Task } from "../../Domain/Task";
import { TaskCriteria } from "../../Domain/TaskCriteria";

export class TasksSearcher {
  private repository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async run(request: SearchTasksRequest): Promise<Nullable<Array<any>>> {
    const tasks = await this.repository.search(
      TaskCriteria.create({
        from: request.from,
        to: request.to,
        type: request.type ,
        status: request.status,
        plantId: request.plantId,
      })
    );
    
    return tasks
      ? tasks.map((task: Task) => task.toPrimitives())
      : null
  }
}
