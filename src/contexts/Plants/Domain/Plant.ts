import { WaterMaintenance } from "./WaterMaintenance";

export class Plant {
  private id: string;
  private nickname: string;
  private commonName?: string;
  private latinName?: string;
  private imageUrl?: string;
  private waterMaintenance?: WaterMaintenance;

  constructor(
    id: string,
    nickname: string,
    commonName?: string,
    latinName?: string,
    imageUrl?: string,
    waterMaintenance?: WaterMaintenance
  ) {
    this.id = id;
    this.nickname = nickname;
    this.commonName = commonName;
    this.latinName = latinName;
    this.imageUrl = imageUrl;
    this.waterMaintenance = waterMaintenance;
  }

  public getId(): string {
    return this.id;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public getCommonName(): string | undefined {
    return this.commonName;
  }

  public getLatinName(): string | undefined {
    return this.latinName;
  }

  public getImageUrl(): string | undefined {
    return this.imageUrl;
  }

  public getWaterMaintenance(): WaterMaintenance | undefined {
    return this.waterMaintenance;
  }

  water(): void {
    // this.waterMaintenance
    // update the last waterMaintenance date to now
    // this.lastWateringDate = Date.now()
    //
    // Update the next waterMaintenance date X days
    // this.nextWateringDate = new Date() + 5 days
  }
}
