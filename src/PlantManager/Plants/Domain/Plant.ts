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

  public getId(): PlantId {
    return this.id;
  }

  public getNickname(): PlantNickname {
    return this.nickname;
  }

  public getMaintenance(): PlantMaintenance {
    return this.maintenance
  }
  
  public getImageUrl(): string | null {
    return this.imageUrl
  }
  

  public toPrimitives() {
    return {
      id: this.getId().toString(),
      nickname: this.getNickname().toString(),
      maintenance: this.getMaintenance(),
      imageUrl: this.getImageUrl()
    }
  }

  static fromPrimitives(data: {
    id: string,
    nickname: string,
    maintenance: any,
    imageUrl?: string | null
  }): Plant {
    const {watering, fertilization} = data.maintenance
    const fertilizationMaintenance = !fertilization
      ? null
      : new PlantFertilizationMaintenance(
        fertilization.frequencyInDays,
        convertToNullableDate(fertilization.lastFertilizationDate),
        convertToNullableDate(fertilization.nextFertilizationDate),
      )
    
    return new Plant(
      new PlantId(data.id),
      new PlantNickname(data.nickname),
      new PlantMaintenance(
        new PlantWateringMaintenance(
          watering.frequencyInDays,
          convertToNullableDate(watering.lastWateringDate),
          convertToNullableDate(watering.nextWateringDate),
        ),
        fertilizationMaintenance
      ),
      data.imageUrl
    )
  }
}

function convertToNullableDate(stringDate: string): Date | null {
  return stringDate ? new Date(stringDate) : null
}