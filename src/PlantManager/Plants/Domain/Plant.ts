import { PlantNickname } from "./PlantNickname";
import { Maintenance } from "../../Maintenance/Domain/Maintenance";
import { PlantId } from "./PlantId";

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

  public markAsWatered(): void {
    this.maintenance.markAsWatered();
  }

  public markAsFertilized(): void {
    this.maintenance.markAsFertilized();
  }

}
