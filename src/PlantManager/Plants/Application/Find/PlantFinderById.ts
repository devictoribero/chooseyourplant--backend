import { PlantRepository } from "../../Domain/PlantRepository";
import { FindPlantByIdRequest } from "./FindPlantByIdRequest";
import { Plant } from "../../Domain/Plant";
import { Nullable } from "../../../../Shared/Domain/Nullable";

export class PlantFinderById {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: FindPlantByIdRequest): Promise<Nullable<Plant>> {
    return this.repository.findById(request.id);
  }
}
