import { PlantRepository } from "../../Domain/PlantRepository";
import { CreatePlantRequest } from "./CreatePlantRequest";
import { Plant } from "../../Domain/Plant";
import { PlantNickname } from "../../Domain/PlantNickname";
import { Maintenance } from "../../../Maintenance/Domain/Maintenance";
import { Uuid } from "../../../../Shared/Domain/ValueObject/Uuid";
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
    const { fertilization } = request.maintenance;
    // we assume that the watering is always present because it's required.
    const { watering } = request.maintenance;

    const plant = new Plant(
      new PlantId(request.id),
      new PlantNickname(request.nickname),
      new Maintenance(
        Uuid.generate().toString(),
        new WateringMaintenance(
          watering.frequencyInDays,
          watering.nextWateringDate,
          watering?.lastWateringDate
        ),
        fertilization ? new FertilizationMaintenance(
          fertilization.frequencyInDays,
          fertilization.nextFertilizationDate,
          fertilization?.lastFertilizationDate
        )
      : null
      )
    );

    return this.repository.save(plant);
  }
}
