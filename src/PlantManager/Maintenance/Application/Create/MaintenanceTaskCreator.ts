import { MaintenanceTaskRepository } from "../../Domain/MaintenanceTaskRepository";
import { CreateMaintenanceTaskRequest } from "./CreateMaintenanceTaskRequest";
import { MaintenanceTask } from "../../Domain/MaintenanceTask"
import { MaintenanceTaskId } from "../../Domain/MaintenanceTaskId"
import { MaintenanceTaskType } from "../../Domain/MaintenanceTaskType"
import { Plant } from "../../../Plants/Domain/Plant";
import { MaintenanceTaskStatus } from "../../Domain/MaintenanceTaskStatus"

export class MaintenanceTaskCreator {
  private repository;

  constructor(repository: MaintenanceTaskRepository) {
    this.repository = repository;
  }

  async run(request: CreateMaintenanceTaskRequest): Promise<void> {
    return this.repository.save(
      new MaintenanceTask(
        new MaintenanceTaskId(request.id),
        request.date,
        new MaintenanceTaskType(request.type),
        Plant.createFromPrimitives(request.plant),
        new MaintenanceTaskStatus(request.status)
      )
    );
  }
}
