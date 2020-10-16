import { PlantRepository } from "../Domain/PlantRepository";
import { Plant } from "../Domain/Plant";
import MongoPlantModel from "./MongoPlantModel";
import { Nullable } from "../../../Shared/Domain/Nullable";
import { PlantAlreadyExists } from "../Domain/PlantAlreadyExists";
import { GeneralError } from "../../../Shared/Domain/GeneralError";

const ID_ALREADY_EXISTING_EXCEPTION = 11000

export class MongoPlantRepository implements PlantRepository {
  async save(plant: Plant): Promise<void> {
    await MongoPlantModel.init()
      .then(() =>
        MongoPlantModel.create({
          id: plant.getId(),
          nickname: plant.getNickname(),
          maintenance: plant.getMaintenance(),
          imageUrl: plant.getImageUrl()
        })
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

    return docs
      ? // @ts-ignore
        docs.map((doc) => new Plant(doc.id, doc.nickname, doc.name))
      : null;
  }
}
