import { PlantRepository } from "../Domain/PlantRepository";
import { Plant } from "../Domain/Plant";
import MongoPlantModel from "./MongoPlantModel";
import { Nullable } from "../../../Shared/Domain/Nullable";
import { PlantAlreadyExists } from "../Domain/PlantAlreadyExists";
import { GeneralError } from "../../../Shared/Domain/GeneralError";
import { PlantId } from "../Domain/PlantId";
import { PlantNickname } from "../Domain/PlantNickname";
import { Maintenance } from "../../Maintenance/Domain/Maintenance";
import { WateringMaintenance } from "../../Maintenance/Domain/WateringMaintenance";
import { FertilizationMaintenance } from "../../Maintenance/Domain/FertilizationMaintenance";

const MONGODB_ID_ALREADY_EXISTING_ERROR_CODE = 11000

export class MongoPlantRepository implements PlantRepository {
  async save(plant: Plant): Promise<void> {
    await MongoPlantModel
      .init()
      .then(() => MongoPlantModel.create(this.fromEntityToDoc(plant)))
      .catch((error) => {
        if (error.code === MONGODB_ID_ALREADY_EXISTING_ERROR_CODE) {
          throw new PlantAlreadyExists(plant.getId());
        }
        throw new GeneralError("Tried to create a plant");
      });
  }


  async findById(id: string): Promise<Nullable<Plant>> {
    return MongoPlantModel
      .init()
      .then(() => MongoPlantModel.findOne({ id }))
      .then(doc => doc ? this.fromDocToEntity(doc) : null)
  }

  
  async find(count: number = 10): Promise<Nullable<Array<Plant>>> {
    return MongoPlantModel
      .init()
      .then(() => MongoPlantModel.find().limit(count))
      .then(docs => docs ? docs.map(this.fromDocToEntity) : null)
  }


  private convertToNullableDate(stringDate: string): Date | null {
    return stringDate ? new Date(stringDate) : null
  }

  /*
   * Maps from a MongoDB Document to the Plant Entity
   */
  private fromDocToEntity(doc: any) : Plant {
    const {watering, fertilization} = doc.maintenance
    console.log(watering.frequencyInDays)
    console.log(watering.lastWateringDate)
    console.log(watering.nextWateringDate)
    const wateringMaintenance = new WateringMaintenance(
      watering.frequencyInDays,
      this.convertToNullableDate(watering.lastWateringDate),
      this.convertToNullableDate(watering.nextWateringDate),
      )
    const fertilizationMaintenance = fertilization
      ? new FertilizationMaintenance(
        fertilization.frequencyInDays,
        this.convertToNullableDate(fertilization.lastFertilizationDate),
        this.convertToNullableDate(fertilization.nextFertilizationDate),
      )
      : null
    
    return new Plant(
      new PlantId(doc.id),
      new PlantNickname(doc.nickname),
      new Maintenance(wateringMaintenance, fertilizationMaintenance),
      doc.imageUrl
    )
  }

  /*
   * Maps from an Entity to a MongoDB Document
   */
  private fromEntityToDoc(plant: Plant): Object {
    return {
      id: plant.getId(),
      nickname: plant.getNickname(),
      maintenance: plant.getMaintenance(),
      imageUrl: plant.getImageUrl()
    }
  }
}
