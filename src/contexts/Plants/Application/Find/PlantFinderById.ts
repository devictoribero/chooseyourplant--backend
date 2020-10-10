import { PlantRepository } from "../../Domain/PlantRepository";
import { FindByIdPlantRequest } from "./FindByIdPlantRequest";
import { Plant } from "../../Domain/Plant";
import { Nullable } from "../../../Shared/Domain/Nullable";

export class PlantFinderById {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: FindByIdPlantRequest): Promise<Nullable<Plant>> {
    return this.repository.findById(request.id);
  }
}
