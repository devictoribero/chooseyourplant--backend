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
import { Criteria } from "../../../Shared/Domain/Criteria/Criteria";
import { TimeInterval } from "../../../Shared/Domain/TimeInterval";

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


  async find(id: string): Promise<Nullable<Plant>> {
    return MongoPlantModel
      .init()
      .then(() => MongoPlantModel.findOne({ id }))
      .then(doc => doc ? this.fromDocToEntity(doc) : null)
      .catch(err => { throw new Error(err) })
  }

  
  async search(criteria: Criteria): Promise<Nullable<Array<Plant>>> {
    return MongoPlantModel
      .init()
      .then(() => MongoPlantModel.find().limit(criteria.getLimit()))
      .then(docs => docs ? docs.map(this.fromDocToEntity) : null)
      .catch(err => { throw new Error(err) })
  }

  async remove(id: string): Promise<void> {
    return MongoPlantModel
      .init()
      .then(async() => { await MongoPlantModel.findOneAndRemove({id}) })
      .catch(err => { throw new Error(err) })
  }

  async getPlantsToWater(timeInterval: TimeInterval) {
    const fromISO = timeInterval.getFrom()?.toISOString()
    const toISO = timeInterval.getTo()?.toISOString()

    return MongoPlantModel
      .init()
      .then(() => 
        MongoPlantModel
          .find()
          .where('maintenance.watering.nextWateringDate')
          .gt(fromISO)
          .lt(toISO)
          .exec(function(error,docs) { console.log(error, docs)})
      )
      .then(docs => docs ? docs.map(this.fromDocToEntity) : null)
      .catch(err => { throw new Error(err) })
  }
  
  // async getPlantsWithPendingFertilization() {}

  /*
   * Maps from a MongoDB Document to the Plant Entity
   */
  private fromDocToEntity(doc: any) : Plant {
    const {watering, fertilization} = doc.maintenance
    const wateringMaintenance = new WateringMaintenance(
      watering.frequencyInDays,
      convertToNullableDate(watering.lastWateringDate),
      convertToNullableDate(watering.nextWateringDate),
    )
    const fertilizationMaintenance = fertilization
      ? new FertilizationMaintenance(
        fertilization.frequencyInDays,
        convertToNullableDate(fertilization.lastFertilizationDate),
        convertToNullableDate(fertilization.nextFertilizationDate),
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


function convertToNullableDate(stringDate: string): Date | null {
  return stringDate ? new Date(stringDate) : null
}