import { MaintenanceTaskRepository } from "../../Domain/MaintenanceTaskRepository";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { SearchMaintenanceTasksRequest } from './SearchMaintenanceTasksRequest'
import { TimeInterval } from "../../../../Shared/Domain/TimeInterval";
import { MaintenanceTask } from "../../Domain/MaintenanceTask";
import dayjs from 'dayjs'

export class MaintenanceTasksSearcher {
  private repository;

  constructor(repository: MaintenanceTaskRepository) {
    this.repository = repository;
  }

  async run(request: SearchMaintenanceTasksRequest): Promise<Nullable<Array<MaintenanceTask>>> {
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
