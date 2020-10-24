import { Router, Request, Response } from "express";
import { PlantEraser } from "../../../../src/PlantManager/Plants/Application/Delete/PlantEraser";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { PlantsDeleteController } from "../../controllers/Plants/PlantsDeleteController";

const router = Router();

// Dependencies injected manually
const mongoPlantRepository = new MongoPlantRepository();
const plantEraser = new PlantEraser(mongoPlantRepository);
const myPlantDeleteController = new PlantsDeleteController(plantEraser);

router.delete("/my-plants/:plantId", (req: Request, res: Response) =>
  myPlantDeleteController.run(req, res)
);

export default router;
