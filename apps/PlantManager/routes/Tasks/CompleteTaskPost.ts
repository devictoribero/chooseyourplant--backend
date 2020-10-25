import { Router, Request, Response } from "express";
import { CompleteTask } from "../../../../src/PlantManager/Tasks/Application/Update/MarkTaskAsCompleted";
import { CompleteTaskPostController } from "../../controllers/Tasks/CompleteTaskPostController";
import { MongoTaskRepository } from "../../../../src/PlantManager/Tasks/Infrastructure/MongoTaskRepository";

const router = Router();

// Dependencies for creating a maintenance task
const taskRepository = new MongoTaskRepository();

// Dependencies for creating a maintenance plant
const completeTask = new CompleteTask(taskRepository);
const myPlantPostController = new CompleteTaskPostController(completeTask);

router.post("/tasks/:id/complete", (req: Request, res: Response) =>
  myPlantPostController.run(req, res)
);

export default router;
