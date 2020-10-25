import { PlantRepository } from "../../Domain/PlantRepository";
import { FindPlantRequest } from "./FindPlantRequest";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { PlantId } from "../../Domain/PlantId";

export class PlantFinder {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: FindPlantRequest): Promise<Nullable<any>> {
    return this.repository
      .find(new PlantId(request.id))
      .then(plant => plant?.toPrimitives())
  }
}
