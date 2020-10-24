import { PlantRepository } from "../../Domain/PlantRepository";
import { SearchPlantsRequest } from "./SearchPlantsRequest";
import { Plant } from "../../Domain/Plant";
import { Criteria } from "../../../../Shared/Domain/Criteria/Criteria";
import { Nullable } from "../../../../Shared/Domain/Nullable";

export class PlantsSearcher {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: SearchPlantsRequest): Promise<Nullable<Array<any>>> {
    const plants = await this.repository.search(new Criteria(request.limit))

    return plants
      ? plants.map(plant => plant.toPrimitives())
      : null
  }
}
