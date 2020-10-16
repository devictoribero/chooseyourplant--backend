import dayjs from "dayjs";
import { WateringMaintenance } from "./WateringMaintenance";
import { FertilizationMaintenance } from "./FertilizationMaintenance";

export class Maintenance {
  private watering: WateringMaintenance;
  private fertilization: FertilizationMaintenance | null;

  constructor(
    watering: WateringMaintenance,
    fertilization?: FertilizationMaintenance | null
  ) {
    this.watering = watering;
    this.fertilization = fertilization || null;
  }

  public getWateringMaintenance(): WateringMaintenance {
    return this.watering
  }

  public getFertilizationMaintenance(): FertilizationMaintenance | null {
    return this.fertilization
  }

  public markAsWatered(): void {
    this.watering.markAsWatered();
  }

  public markAsFertilized(): void {
    this.fertilization?.markAsFertilized();
  }
}
