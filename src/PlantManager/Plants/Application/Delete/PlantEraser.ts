import { PlantRepository } from "../../Domain/PlantRepository";
import { PlantEraserRequest } from "./PlantEraserRequest";
import { TaskRepository } from "../../../Tasks/Domain/TaskRepository";
import { TaskCriteria } from "../../../Tasks/Domain/TaskCriteria";
import { PlantId } from "../../Domain/PlantId";
import mongoose from 'mongoose'

export class PlantEraser {
  private repository;
  private taskRepository;

  constructor(repository: PlantRepository, taskRepository: TaskRepository) {
    this.repository = repository;
    this.taskRepository = taskRepository;
  }

  async run(request: PlantEraserRequest): Promise<void> {
    // init transaction
    const transaction = await mongoose.startSession()
    transaction.startTransaction()

    // Remove a plant
    await this.repository.remove(new PlantId(request.id), transaction);

    const pendingTasks = await this.taskRepository.search(
      TaskCriteria.create({ plantId: request.id })
    ) || []

    // If the plant has been created successfully,
    // we create the tasks related to watering and fertilization for this plant
    // 
    // We store all the promises to create the tasks in an array.
    let createTasksQueue: any = []
    pendingTasks.map(task =>
      createTasksQueue.push(
        this.taskRepository.remove(task.getId().toString())
      )
    )

    await Promise.all(createTasksQueue)
  }
}
