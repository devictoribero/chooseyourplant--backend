import { Router, Request, Response } from "express";
import { DeleteTask } from "../../../../src/PlantManager/Tasks/Application/Delete/DeleteTask";
import { MongoTaskRepository } from "../../../../src/PlantManager/Tasks/Infrastructure/MongoTaskRepository";
import { TasksDeleteController } from "../../controllers/Tasks/TasksDeleteController";

const router = Router();

// Dependencies injected manually
const mongoPlantRepository = new MongoTaskRepository();
const deleteTask = new DeleteTask(mongoPlantRepository);
const tasksDeleteController = new TasksDeleteController(deleteTask);

router.delete("/tasks/:plantId", (req: Request, res: Response) =>
  tasksDeleteController.run(req, res)
);

export default router;
