import { Router, Request, Response } from "express";
import { TasksSearcher } from "../../../../src/PlantManager/Tasks/Application/Search/TasksSearcher";
import { MongoTaskRepository } from "../../../../src/PlantManager/Tasks/Infrastructure/MongoTaskRepository";
import { PendingTasksGetController } from "../../controllers/Maintenance/PendingTasksGetController";

const router = Router();
// Dependencies for creating a plant
const repository = new MongoTaskRepository();
const maintenaceTasksSearcher = new TasksSearcher(repository);
const pendingTasksGetController = new PendingTasksGetController(maintenaceTasksSearcher);

router.get("/tasks/pending", (req: Request, res: Response) =>
  pendingTasksGetController.run(req, res)
);

export default router;
