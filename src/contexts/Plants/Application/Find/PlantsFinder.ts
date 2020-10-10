import { PlantRepository } from "../../Domain/PlantRepository";
import { FindPlantsRequest } from "./FindPlantsRequest";
import { Plant } from "../../Domain/Plant";
import { Nullable } from "../../../Shared/Domain/Nullable";

export class PlantsFinder {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: FindPlantsRequest): Promise<Nullable<Array<Plant>>> {
    return this.repository.find(request.count);
  }
}
