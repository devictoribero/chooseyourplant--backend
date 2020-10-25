import { Router, Request, Response } from "express";
import { SearchPlants } from "../../../../src/PlantManager/Plants/Application/Search/SearchPlants";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { PlantsGetController } from "../../controllers/Plants/PlantsGetController";

const router = Router();
// Dependencies for creating a plant
const plantRepository = new MongoPlantRepository();
const plantsFinder = new SearchPlants(plantRepository);
const plantsGetController = new PlantsGetController(plantsFinder);

router.get("/my-plants", (req: Request, res: Response) =>
  plantsGetController.run(req, res)
);

export default router;
