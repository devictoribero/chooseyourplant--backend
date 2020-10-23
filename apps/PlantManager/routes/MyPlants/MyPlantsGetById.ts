import { Router, Request, Response } from "express";
import { PlantFinder } from "../../../../src/PlantManager/Plants/Application/Find/PlantFinder";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { MyPlantsGetByIdController } from "../../controllers/MyPlants/MyPlantsGetByIdController";

const router = Router();
// Dependencies for creating a plant
const mongoPlantRepository = new MongoPlantRepository();
const plantFinder = new PlantFinder(mongoPlantRepository);
const myPlantGetByIdController = new MyPlantsGetByIdController(plantFinder);

router.get("/my-plants/:plantId", (req: Request, res: Response) =>
  myPlantGetByIdController.run(req, res)
);

export default router;
