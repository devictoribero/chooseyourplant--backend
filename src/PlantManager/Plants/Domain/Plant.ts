import { PlantNickname } from "./PlantNickname";
import { Maintenance } from "../../Maintenance/Domain/Maintenance";
import { PlantId } from "./PlantId";
import { WateringMaintenance } from "../../Maintenance/Domain/WateringMaintenance";
import { FertilizationMaintenance } from "../../Maintenance/Domain/FertilizationMaintenance";

export class Plant {
  private id: PlantId;
  private nickname: PlantNickname;
  private maintenance: Maintenance;
  private imageUrl: string | null;

  constructor(
    id: PlantId,
    nickname: PlantNickname,
    maintenance: Maintenance,
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

  public getMaintenance() : Maintenance {
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
      new Maintenance(
        new WateringMaintenance(data.maintenance.watering),
        new FertilizationMaintenance(data.maintenance.watering)
      ),
      data.imageUrl
    )
  }
}
