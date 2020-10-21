import { PlantRepository } from "../../Domain/PlantRepository";
import { Plant } from "../../Domain/Plant";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { TimeInterval } from "../../../../Shared/Domain/TimeInterval";
import dayjs from 'dayjs'

export class PlantsMaintenanceNotificationsSearcher {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(from?: Date, to?: Date): Promise<Nullable<Array<Plant>>> {
    // Calculate midnight dates because the interval it's easier to calculate
    const fromMidnightDate = this.getMidnightDate(from)
    const toMidnightDate = this.getMidnightDate(to)
    
    const timeInterval = new TimeInterval(fromMidnightDate, toMidnightDate)

    return this.repository.getPlantsToWater(timeInterval);
  }


  private getMidnightDate(dateToTransform?: Date): Date | undefined {
    if (!dateToTransform) return
    
    const fromDDMMYYY = dayjs(dateToTransform).format('DD/MM/YYYY');
    return new Date(fromDDMMYYY)
  }
}
