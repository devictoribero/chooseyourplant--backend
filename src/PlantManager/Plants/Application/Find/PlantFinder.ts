import { PlantRepository } from "../../Domain/PlantRepository";
import { FindPlantRequest } from "./FindPlantRequest";
import { Nullable } from "../../../../Shared/Domain/Nullable";

export class PlantFinder {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: FindPlantRequest): Promise<Nullable<any>> {
    return this.repository
      .find(request.id)
      .then(plant => plant?.toPrimitives())
  }
}
