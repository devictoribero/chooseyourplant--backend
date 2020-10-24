import dayjs from "dayjs";
import { PlantWateringMaintenance } from "./PlantWateringMaintenance";
import { PlantFertilizationMaintenance } from "./PlantFertilizationMaintenance";

export class PlantMaintenance {
  private watering: PlantWateringMaintenance;
  private fertilization: PlantFertilizationMaintenance | null;

  constructor(
    watering: PlantWateringMaintenance,
    fertilization?: PlantFertilizationMaintenance | null
  ) {
    this.watering = watering;
    this.fertilization = fertilization || null;
  }

  public getWateringFrequencyInDays(): number {
    return this.watering.getFrequencyInDays()
  }

  public getLastWateringDate(): Date | null {
    return this.watering.getLastWateringDate()
  }

  public getNextWateringDate(): Date {
    return this.watering.getNextWateringDate()
  }

  public hasBeenWateredBefore(): boolean {
    return Boolean(this.getLastWateringDate())
  }

  public getFertilizationFrequencyInDays(): number | null {
    return this.fertilization
      ? this.fertilization.getFrequencyInDays()
      : null
  }

  public getLastFertilizationDate(): Date | null {
    return this.fertilization
      ? this.fertilization.getLastFertilizationDate()
      : null
  }

  public getNextFertilizationDate(): Date | null {
    return this.fertilization
      ? this.fertilization.getNextFertilizationDate()
      : null
  }

  public hasFertilizationMaintenance(): boolean {
    return Boolean(this.fertilization)
  }

  public hasBeenFertilizedBefore(): boolean {
    return Boolean(this.getLastFertilizationDate())
  }
}
