import { PlantRepository } from "../Domain/PlantRepository";
import { Plant } from "../Domain/Plant";
import MongoPlantModel from "./MongoPlantModel";
import { Nullable } from "../../Shared/Domain/Nullable";

export class MongoPlantRepository implements PlantRepository {
  async save(plant: Plant): Promise<void> {
    await MongoPlantModel.create({
      id: plant.id,
      nickname: plant.nickname,
      name: plant.name,
    });
  }

  async findById(id: string): Promise<Nullable<Plant>> {
    const doc = await MongoPlantModel.findOne({ id });

    // @ts-ignore
    return doc ? new Plant(id, doc.nickname, doc.name) : null;
  }
}
