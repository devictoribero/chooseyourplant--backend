import { Router, Request, Response } from "express";
import { PlantEraser } from "../../../../src/PlantManager/Plants/Application/Delete/PlantEraser";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { MyPlantsDeleteController } from "../../controllers/MyPlants/MyPlantsDeleteController";

const router = Router();

// Dependencies injected manually
const mongoPlantRepository = new MongoPlantRepository();
const plantEraser = new PlantEraser(mongoPlantRepository);
const myPlantDeleteController = new MyPlantsDeleteController(plantEraser);

router.delete("/my-plants/:plantId", (req: Request, res: Response) =>
  myPlantDeleteController.run(req, res)
);

export default router;
