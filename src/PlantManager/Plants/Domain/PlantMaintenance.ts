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

  public getWateringMaintenance(): PlantWateringMaintenance {
    return this.watering
  }

  public getFertilizationMaintenance(): PlantFertilizationMaintenance | null {
    return this.fertilization
  }
}
