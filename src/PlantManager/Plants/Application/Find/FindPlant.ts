import { PlantRepository } from "../../Domain/PlantRepository";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { PlantId } from "../../Domain/PlantId";

export class FindPlant {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: {
    id: string;
  }): Promise<Nullable<any>> {
    return this.repository
      .findOne(new PlantId(request.id))
      .then(plant => plant?.toPrimitives())
  }
}
