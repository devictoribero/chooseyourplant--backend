import { Router, Request, Response } from "express";
import { MaintenanceTasksSearcher } from "../../../../src/PlantManager/Maintenance/Application/Search/MaintenanceTasksSearcher";
import { MongoMaintenanceTaskRepository } from "../../../../src/PlantManager/Maintenance/Infrastructure/MongoMaintenanceTaskRepository";
import { MaintenancePendingTasksGetController } from "../../controllers/Maintenance/MaintenancePendingTasksGetController";

const router = Router();
// Dependencies for creating a plant
const repository = new MongoMaintenanceTaskRepository();
const maintenaceTasksSearcher = new MaintenanceTasksSearcher(repository);
const maintenancePendingTasksGetController = new MaintenancePendingTasksGetController(maintenaceTasksSearcher);

router.get("/maintenance-tasks/pending", (req: Request, res: Response) =>
  maintenancePendingTasksGetController.run(req, res)
);

export default router;
