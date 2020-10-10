import { PlantRepository } from "../../Domain/PlantRepository";
import { CreatePlantRequest } from "./CreatePlantRequest";
import { Plant } from "../../Domain/Plant";

export class PlantCreator {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: CreatePlantRequest): Promise<void> {
    const plant = new Plant(request.id, request.nickname, request.name);

    return this.repository.save(plant);
  }
}
