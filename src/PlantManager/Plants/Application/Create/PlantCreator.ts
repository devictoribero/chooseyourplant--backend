import { PlantRepository } from "../../Domain/PlantRepository";
import { CreatePlantRequest } from "./CreatePlantRequest";
import { Plant } from "../../Domain/Plant";
import { PlantNickname } from "../../Domain/PlantNickname";
import { PlantMaintenance } from "../../Domain/PlantMaintenance";
import { PlantWateringMaintenance } from "../../Domain/PlantWateringMaintenance";
import { PlantFertilizationMaintenance } from "../../Domain/PlantFertilizationMaintenance";
import { PlantId } from "../../Domain/PlantId";

export class PlantCreator {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: CreatePlantRequest): Promise<void> {
    // The fertilization is not required, because not every one does it
    const { watering, fertilization } = request.maintenance;

    const wateringMaintenance = new PlantWateringMaintenance(
      watering.frequencyInDays,
      watering?.lastWateringDate,
      watering.nextWateringDate,
    )
    const fertilizationMaintenance = fertilization
      ? new PlantFertilizationMaintenance(
        fertilization.frequencyInDays,
        fertilization?.lastFertilizationDate,
        fertilization?.nextFertilizationDate,
      )
      : null

    return this.repository.save(
      new Plant(
        new PlantId(request.id),
        new PlantNickname(request.nickname),
        new PlantMaintenance(wateringMaintenance, fertilizationMaintenance)
      )
    );
  }
}
