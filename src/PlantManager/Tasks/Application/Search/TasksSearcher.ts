import { TaskRepository } from "../../Domain/TaskRepository";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { SearchTasksRequest } from './SearchTasksRequest'
import { TimeInterval } from "../../../../Shared/Domain/TimeInterval";
import { Task } from "../../Domain/Task";
import dayjs from 'dayjs'

export class TasksSearcher {
  private repository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async run(request: SearchTasksRequest): Promise<Nullable<Array<Task>>> {
    // Calculate midnight dates because the interval it's easier to calculate
    const fromMidnightDate = this.getMidnightDate(request.from)
    const toMidnightDate = this.getMidnightDate(request.to)
    
    const timeInterval = new TimeInterval(fromMidnightDate, toMidnightDate)

    return this.repository.search(timeInterval);
  }


  private getMidnightDate(dateToTransform?: Date): Date | undefined {
    if (!dateToTransform) return
    
    const fromDDMMYYY = dayjs(dateToTransform).format('DD/MM/YYYY');
    return new Date(fromDDMMYYY)
  }
}
