import { Router, Request, Response } from "express";
import { PlantsFinder } from "../../../../src/PlantManager/Plants/Application/Find/PlantsFinder";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { MyPlantsGetController } from "../../controllers/MyPlants/MyPlantsGetController";

const router = Router();
// Dependencies for creating a plant
const mongoPlantRepository = new MongoPlantRepository();
const plantsFinder = new PlantsFinder(mongoPlantRepository);
const myPlantsGetController = new MyPlantsGetController(plantsFinder);

router.get("/my-plants", (req: Request, res: Response) =>
  myPlantsGetController.run(req, res)
);

export default router;