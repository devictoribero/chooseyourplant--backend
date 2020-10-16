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

const ID_ALREADY_EXISTING_EXCEPTION = 11000

export class MongoPlantRepository implements PlantRepository {
  async save(plant: Plant): Promise<void> {
    await MongoPlantModel.init()
      .then(() =>
        MongoPlantModel.create(this.fromEntityToDoc(plant))
      )
      .catch((error) => {
        console.log(error)
        if (error.code === ID_ALREADY_EXISTING_EXCEPTION) {
          throw new PlantAlreadyExists(plant.getId());
        }
        throw new GeneralError("Tried to create a plant");
      });
  }

  async findById(id: string): Promise<Nullable<Plant>> {
    const doc = await MongoPlantModel.init().then(() =>
      MongoPlantModel.findOne({ id })
    );

    // @ts-ignore
    return doc ? new Plant(id, doc.nickname, doc.name) : null;
  }

  async find(count: number = 10): Promise<Nullable<Array<Plant>>> {
    const docs = await MongoPlantModel.init().then(() =>
      MongoPlantModel.find().limit(count)
    );

    if (!docs) return null

    return docs.map(this.fromDocToEntity)
  }

  private fromDocToEntity(doc: any) : Plant {
    const wateringMaintenance = new WateringMaintenance(
      doc.watering.frequencyInDays,
      doc.watering.lastWateringDate || null,
      doc.watering.nextWateringDate || null,
    )
    const fertilizationMaintenance = doc.fertilization
      ? new FertilizationMaintenance(
        doc.fertilization.frequencyInDays,
        doc.fertilization.lastFertilizationDate || null,
        doc.fertilization.nextFertilizationDate || null,
      )
      : null

    return new Plant(
      new PlantId(doc.id),
      new PlantNickname(doc.nickname),
      new Maintenance(wateringMaintenance, fertilizationMaintenance),
      doc.imageUrl
    )
  }

  private fromEntityToDoc(plant: Plant): Object {
    return {
      id: plant.getId(),
      nickname: plant.getNickname(),
      maintenance: plant.getMaintenance(),
      imageUrl: plant.getImageUrl()
    }
  }
}
