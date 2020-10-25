import { Router, Request, Response } from "express";
import { FindPlant } from "../../../../src/PlantManager/Plants/Application/Find/FindPlant";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { PlantsGetByIdController } from "../../controllers/Plants/PlantsGetByIdController";

const router = Router();
// Dependencies for creating a plant
const mongoPlantRepository = new MongoPlantRepository();
const findPlant = new FindPlant(mongoPlantRepository);
const myPlantGetByIdController = new PlantsGetByIdController(findPlant);

router.get("/my-plants/:plantId", (req: Request, res: Response) =>
  myPlantGetByIdController.run(req, res)
);

export default router;
