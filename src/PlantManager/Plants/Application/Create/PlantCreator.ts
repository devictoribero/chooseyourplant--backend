import { PlantRepository } from "../../Domain/PlantRepository";
import { CreatePlantRequest } from "./CreatePlantRequest";
import { Plant } from "../../Domain/Plant";

export class PlantCreator {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: CreatePlantRequest): Promise<void> {
    return this.repository.save(
      Plant.createFromPrimitives({
        id: request.id,
        nickname: request.nickname,
        maintenance: request.maintenance,
        imageUrl: request.imageUrl
      })
    );
  }
}
