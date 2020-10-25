import { Router, Request, Response } from "express";
import { PlantEraser } from "../../../../src/PlantManager/Plants/Application/Delete/PlantEraser";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { MongoTaskRepository } from "../../../../src/PlantManager/Tasks/Infrastructure/MongoTaskRepository";
import { PlantsDeleteController } from "../../controllers/Plants/PlantsDeleteController";

const router = Router();

// Dependencies injected manually
const taskRepository = new MongoTaskRepository();
const plantRepository = new MongoPlantRepository();
const plantEraser = new PlantEraser(plantRepository, taskRepository);
const myPlantDeleteController = new PlantsDeleteController(plantEraser);

router.delete("/my-plants/:plantId", (req: Request, res: Response) =>
  myPlantDeleteController.run(req, res)
);

export default router;
