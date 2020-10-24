import { Router, Request, Response } from "express";
import { TasksSearcher } from "../../../../src/PlantManager/Maintenance/Application/Search/TasksSearcher";
import { MongoTaskRepository } from "../../../../src/PlantManager/Maintenance/Infrastructure/MongoTaskRepository";
import { MaintenancePendingTasksGetController } from "../../controllers/Maintenance/MaintenancePendingTasksGetController";

const router = Router();
// Dependencies for creating a plant
const repository = new MongoTaskRepository();
const maintenaceTasksSearcher = new TasksSearcher(repository);
const maintenancePendingTasksGetController = new MaintenancePendingTasksGetController(maintenaceTasksSearcher);

router.get("/maintenance-tasks/pending", (req: Request, res: Response) =>
  maintenancePendingTasksGetController.run(req, res)
);

export default router;
