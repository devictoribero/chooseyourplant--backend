import { PlantRepository } from "../../Domain/PlantRepository";
import { CreatePlantRequest } from "./CreatePlantRequest";
import { Plant } from "../../Domain/Plant";
import { PlantNickname } from "../../Domain/PlantNickname";
import { Maintenance } from "../../../Maintenance/Domain/Maintenance";
import { WateringMaintenance } from "../../../Maintenance/Domain/WateringMaintenance";
import { FertilizationMaintenance } from "../../../Maintenance/Domain/FertilizationMaintenance";
import { PlantId } from "../../Domain/PlantId";

export class PlantCreator {
  private repository;

  constructor(repository: PlantRepository) {
    this.repository = repository;
  }

  async run(request: CreatePlantRequest): Promise<void> {
    // The fertilization is not required, because not every one does it
    const { watering, fertilization } = request.maintenance;

    const wateringMaintenance = new WateringMaintenance(
      watering.frequencyInDays,
      watering.nextWateringDate,
      watering?.lastWateringDate
    )
    const fertilizationMaintenance = fertilization
      ? new FertilizationMaintenance(
        fertilization.frequencyInDays,
        fertilization?.nextFertilizationDate,
        fertilization?.lastFertilizationDate
      )
      : null

    return this.repository.save(
      new Plant(
        new PlantId(request.id),
        new PlantNickname(request.nickname),
        new Maintenance(wateringMaintenance, fertilizationMaintenance)
      )
    );
  }
}
