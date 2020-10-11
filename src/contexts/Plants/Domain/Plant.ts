import { WaterMaintenance } from "./WaterMaintenance";
import { FertilizationMaintenance } from "./FertilizationMaintenance";
import dayjs from "dayjs";

export class Plant {
  private id: string;
  private nickname: string;
  private commonName?: string;
  private latinName?: string;
  private imageUrl?: string;
  private waterMaintenance: WaterMaintenance | null;
  private fertilizationMaintenance: FertilizationMaintenance | null;

  constructor(
    id: string,
    nickname: string,
    commonName?: string,
    latinName?: string,
    imageUrl?: string,
    waterMaintenance?: WaterMaintenance | null,
    fertilizationMaintenance?: FertilizationMaintenance | null
  ) {
    this.id = id;
    this.nickname = nickname;
    this.commonName = commonName;
    this.latinName = latinName;
    this.imageUrl = imageUrl;
    this.waterMaintenance = waterMaintenance || null;
    this.fertilizationMaintenance = fertilizationMaintenance || null;
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

  markAsWatered(): void {
    // update the last time the plant has been watered to now
    const now = new Date();
    this.waterMaintenance?.updateLastWateringDate(now);

    // calculate next watering time from now
    this.waterMaintenance?.updateNextWateringDate(
      this.incrementDays(now, this.waterMaintenance.getFrequencyInDays())
    );
  }

  markAsFertilized(): void {
    // update the last time the plant has been fertilized to now
    const now = new Date();
    this.fertilizationMaintenance?.updateLastFertilizationDate(now);

    // calculate next fertilization time from now
    this.fertilizationMaintenance?.updateNextFertilizationDate(
      this.incrementDays(
        now,
        this.fertilizationMaintenance.getFrequencyInDays()
      )
    );
  }

  incrementDays(date: Date, days: number): Date {
    const dateIncremented = dayjs(date).add(days, "day").format();
    return new Date(dateIncremented);
  }
}
