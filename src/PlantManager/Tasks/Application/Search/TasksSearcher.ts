import { TaskRepository } from "../../Domain/TaskRepository";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { SearchTasksRequest } from './SearchTasksRequest'
import { Task } from "../../Domain/Task";
import dayjs from 'dayjs'
import { TaskCriteria } from "../../Domain/TaskCriteria";
import { TaskType } from "../../Domain/TaskType";
import { TaskStatus } from "../../Domain/TaskStatus";

export class TasksSearcher {
  private repository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async run(request: SearchTasksRequest): Promise<Nullable<Array<any>>> {
    // Calculate midnight dates because the interval it's easier to calculate
    // const fromMidnightDate = this.getMidnightDate(request.from)
    // const toMidnightDate = this.getMidnightDate(request.to)
    
    // const timeInterval = new TimeInterval(fromMidnightDate, toMidnightDate)

    const criteria = new TaskCriteria(
      request.from,
      request.to,
      request.type ? new TaskType(request.type) : undefined,
      request.status ? new TaskStatus(request.status) : undefined
    )
    console.log(criteria)
    const tasks = await this.repository.search(criteria);
    return tasks
      ? tasks.map((task: Task) => task.toPrimitives())
      : null
  }


  private getMidnightDate(dateToTransform?: Date): Date | undefined {
    if (!dateToTransform) return
    
    const fromDDMMYYY = dayjs(dateToTransform).format('DD/MM/YYYY');
    return new Date(fromDDMMYYY)
  }
}
