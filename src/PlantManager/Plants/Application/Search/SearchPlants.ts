import { PlantRepository } from "../../Domain/PlantRepository";
import { Criteria } from "../../../../Shared/Domain/Criteria/Criteria";
import { Nullable } from "../../../../Shared/Domain/Nullable";

export class SearchPlants {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: {
    limit: number;
  }): Promise<Nullable<Array<any>>> {
    const plants = await this.repository.search(new Criteria(request.limit))

    return plants
      ? plants.map(plant => plant.toPrimitives())
      : null
  }
}
