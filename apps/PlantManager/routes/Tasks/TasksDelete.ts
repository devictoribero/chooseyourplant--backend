import { Router, Request, Response } from "express";
import { TaskEraser } from "../../../../src/PlantManager/Tasks/Application/Delete/TaskEraser";
import { MongoTaskRepository } from "../../../../src/PlantManager/Tasks/Infrastructure/MongoTaskRepository";
import { TasksDeleteController } from "../../controllers/Tasks/TasksDeleteController";

const router = Router();

// Dependencies injected manually
const mongoPlantRepository = new MongoTaskRepository();
const taskEraser = new TaskEraser(mongoPlantRepository);
const tasksDeleteController = new TasksDeleteController(taskEraser);

router.delete("/tasks/:plantId", (req: Request, res: Response) =>
  tasksDeleteController.run(req, res)
);

export default router;
