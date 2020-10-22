import { PlantNickname } from "./PlantNickname";
import { PlantMaintenance } from "./PlantMaintenance";
import { PlantId } from "./PlantId";
import { PlantWateringMaintenance } from "./PlantWateringMaintenance";
import { PlantFertilizationMaintenance } from "./PlantFertilizationMaintenance";

export class Plant {
  private id: PlantId;
  private nickname: PlantNickname;
  private maintenance: PlantMaintenance;
  private imageUrl: string | null;

  constructor(
    id: PlantId,
    nickname: PlantNickname,
    maintenance: PlantMaintenance,
    imageUrl?: string | null
  ) {
    this.id = id;
    this.nickname = nickname;
    this.maintenance = maintenance;
    this.imageUrl = imageUrl || null;
  }

  public getId(): string {
    return this.id.toString()
  }

  public getNickname(): string {
    return this.nickname.toString();
  }

  public getImageUrl(): string | null {
    return this.imageUrl
  }

  public getMaintenance() : PlantMaintenance {
    return this.maintenance
  }
  
  static createFromPrimitives(data: {
    id: string,
    nickname: string,
    maintenance: any,
    imageUrl?: string | null
  }): Plant {
    return new Plant(
      new PlantId(data.id),
      new PlantNickname(data.nickname),
      new PlantMaintenance(
        new PlantWateringMaintenance(
          data.maintenance.watering.frequencyInDays,
          data.maintenance.watering.lastWateringDate,
          data.maintenance.watering.nextWateringDate
        ),
        new PlantFertilizationMaintenance(
          data.maintenance.fertilization.frequencyInDays,
          data.maintenance.fertilization.lastFertilizationDate,
          data.maintenance.fertilization.nextFertilizationDate
        )
      ),
      data.imageUrl
    )
  }
}
