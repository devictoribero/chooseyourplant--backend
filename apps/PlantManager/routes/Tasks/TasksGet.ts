import { Router, Request, Response } from "express";
import { SearchTasks } from "../../../../src/PlantManager/Tasks/Application/Search/SearchTasks";
import { MongoTaskRepository } from "../../../../src/PlantManager/Tasks/Infrastructure/MongoTaskRepository";
import { TasksGetController } from "../../controllers/Tasks/TasksGetController";

const router = Router();
// Dependencies for creating a plant
const repository = new MongoTaskRepository();
const searchTasks = new SearchTasks(repository);
const pendingTasksGetController = new TasksGetController(searchTasks);

router.get("/tasks", (req: Request, res: Response) =>
  pendingTasksGetController.run(req, res)
);

export default router;
