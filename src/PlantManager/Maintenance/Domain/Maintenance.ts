import dayjs from "dayjs";
import { WateringMaintenance } from "./WateringMaintenance";
import { FertilizationMaintenance } from "./FertilizationMaintenance";

export class Maintenance {
  private id: string;
  private watering: WateringMaintenance;
  private fertilization: FertilizationMaintenance | null;

  constructor(
    id: string,
    watering: WateringMaintenance,
    fertilization?: FertilizationMaintenance | null
  ) {
    this.id = id;
    this.watering = watering;
    this.fertilization = fertilization || null;
  }

  public getId(): string {
    return this.id;
  }

  public markAsWatered(): void {
    this.watering.markAsWatered();
  }

  public markAsFertilized(): void {
    this.fertilization?.markAsFertilized();
  }
}
