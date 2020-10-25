import { Router, Request, Response } from "express";
import { DeletePlant } from "../../../../src/PlantManager/Plants/Application/Delete/DeletePlant";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { MongoTaskRepository } from "../../../../src/PlantManager/Tasks/Infrastructure/MongoTaskRepository";
import { PlantsDeleteController } from "../../controllers/Plants/PlantsDeleteController";

const router = Router();

// Dependencies injected manually
const taskRepository = new MongoTaskRepository();
const plantRepository = new MongoPlantRepository();
const deletePlant = new DeletePlant(plantRepository, taskRepository);
const myPlantDeleteController = new PlantsDeleteController(deletePlant);

router.delete("/my-plants/:plantId", (req: Request, res: Response) =>
  myPlantDeleteController.run(req, res)
);

export default router;
