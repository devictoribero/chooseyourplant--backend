import { Router, Request, Response } from "express";
import { TasksSearcher } from "../../../../src/PlantManager/Tasks/Application/Search/TasksSearcher";
import { MongoTaskRepository } from "../../../../src/PlantManager/Tasks/Infrastructure/MongoTaskRepository";
import { TasksGetController } from "../../controllers/Tasks/TasksGetController";

const router = Router();
// Dependencies for creating a plant
const repository = new MongoTaskRepository();
const tasksSearcher = new TasksSearcher(repository);
const pendingTasksGetController = new TasksGetController(tasksSearcher);

router.get("/tasks", (req: Request, res: Response) =>
  pendingTasksGetController.run(req, res)
);

export default router;
