import { PlantRepository } from "../../Domain/PlantRepository";
import { PlantEraserRequest } from "./PlantEraserRequest";

export class PlantEraser {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: PlantEraserRequest): Promise<void> {
    return this.repository.remove(request.id);
  }
}
