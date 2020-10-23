import mongoose from 'mongoose'
import { PlantRepository } from "../../Domain/PlantRepository";
import { CreatePlantRequest } from "./CreatePlantRequest";
import { Plant } from "../../Domain/Plant";
import {
  MaintenanceTaskCreator,
  TASKS_TYPES,
  TASKS_STATUS
} from "../../../Maintenance/Application/Create/MaintenanceTaskCreator";
import { Uuid } from '../../../../Shared/Domain/ValueObject/Uuid'

export class PlantCreator {
  private repository;
  private maintenanceTaskCreator;

  constructor(
    repository: PlantRepository,
    maintenanceTaskCreator: MaintenanceTaskCreator,
  ) {
    this.repository = repository;
    this.maintenanceTaskCreator = maintenanceTaskCreator;
  }

  async run(request: CreatePlantRequest): Promise<void> {
    const plant = Plant.createFromPrimitives({
      id: request.id,
      nickname: request.nickname,
      maintenance: request.maintenance,
      imageUrl: request.imageUrl
    })
    // init transaction
    const session = await mongoose.startSession()
    session.startTransaction()
    console.log('buddy')

    // do stuff
    console.log('with transaction')
    await this.repository.save(plant, session);
    console.log('saved')

    await session.commitTransaction();
    console.log('commitTransaction')
    await session.endSession();
    console.log('endSession')

    // If the plant has been created successfully,
    // we create the tasks related to watering and fertilization of this plant
    const nextWateringDate = plant
      .getMaintenance()
      .getWateringMaintenance()
      .getNextWateringDate()

    await this.maintenanceTaskCreator
      .run({
        id: Uuid.generate().toString(),
        date: nextWateringDate,
        type: TASKS_TYPES.WATERING,
        plant: plant,
        status: TASKS_STATUS.PENDING,
      })
      .catch(err => {})
  }
}
