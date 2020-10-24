import mongoose from 'mongoose'
import { PlantRepository } from "../../Domain/PlantRepository";
import { CreatePlantRequest } from "./CreatePlantRequest";
import { Plant } from "../../Domain/Plant";
import {
  TASKS_TYPES,
  TASKS_STATUS
} from "../../../Maintenance/Application/Create/MaintenanceTaskCreator";
import { Uuid } from '../../../../Shared/Domain/ValueObject/Uuid'
import { MaintenanceTaskRepository } from '../../../Maintenance/Domain/MaintenanceTaskRepository';
import { MaintenanceTask } from '../../../Maintenance/Domain/MaintenanceTask';
import { promises } from 'fs';

export class PlantCreator {
  private repository;
  private maintenanceTaskRepository;

  constructor(
    repository: PlantRepository,
    maintenanceTaskRepository: MaintenanceTaskRepository,
  ) {
    this.repository = repository;
    this.maintenanceTaskRepository = maintenanceTaskRepository;
  }

  async run(request: CreatePlantRequest): Promise<void> {
    // init transaction
    const transaction = await mongoose.startSession()
    transaction.startTransaction()
    
    // Create a Plant
    const plantJSON = {
      id: request.id,
      nickname: request.nickname,
      maintenance: request.maintenance,
      imageUrl: request.imageUrl
    }
    const plant = Plant.fromPrimitives(plantJSON)
    await this.repository.save(plant, transaction);
    
    // If the plant has been created successfully,
    // we create the tasks related to watering and fertilization for this plant
    // 
    // We store all the promises to create the tasks in an array.
    let createTasksQueue = []

    // We check if the plant needs a fertilization maintenance to be done.
    const plantMaintenance = plant.getMaintenance()
    const hasToCreateLastFertilizationTask =  plantMaintenance.hasFertilizationMaintenance()
      && plantMaintenance.hasBeenFertilizedBefore()
    if (hasToCreateLastFertilizationTask) {
      createTasksQueue.push(
        this.createTask({
          date: plantMaintenance.getLastFertilizationDate()?.toISOString(),
          type: TASKS_TYPES.FERTILIZATION,
          plant: plant.toPrimitives(),
          status: TASKS_STATUS.COMPLETED,
        }, transaction)
      )
    }

    // We can assume that if the plant has a fertilization maintenance,
    // its's because is has a date to be fertilizated
    const hasToCreateNextFertilizationTask =  plantMaintenance.hasFertilizationMaintenance()
    if (hasToCreateNextFertilizationTask) {
      createTasksQueue.push(
        this.createTask({
          date: plantMaintenance.getNextFertilizationDate()?.toISOString(),
          type: TASKS_TYPES.FERTILIZATION,
          plant: plant.toPrimitives(),
          status: TASKS_STATUS.PENDING,
        }, transaction)
      )
    }
    
    // We check if the plant has been watered before, because not all have been.
    if (plantMaintenance.hasBeenWateredBefore()) {
      createTasksQueue.push(
        this.createTask({
          date: plantMaintenance.getLastWateringDate()?.toISOString(),
          type: TASKS_TYPES.WATERING,
          plant: plant.toPrimitives(),
          status: TASKS_STATUS.COMPLETED,
        }, transaction)
      )
    }

    createTasksQueue.push(
      this.createTask({
        date: plantMaintenance.getNextWateringDate().toISOString(),
        type: TASKS_TYPES.WATERING,
        plant: plant.toPrimitives(),
        status: TASKS_STATUS.PENDING,
      }, transaction)
    )

    await Promise.all(createTasksQueue)
    
    await transaction.commitTransaction();
    await transaction.endSession();
  }

  private createTask(data: any, transaction: any) {
    return this.maintenanceTaskRepository.save(
      MaintenanceTask.fromPrimitives({
        id: Uuid.generate().toString(),
        // @ts-ignore
        date: data.date,
        type: data.type,
        plant: data.plant,
        status: data.status,
      }), 
      transaction
    )
  }
}
