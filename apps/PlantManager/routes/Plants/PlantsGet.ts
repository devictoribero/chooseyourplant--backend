import { Router, Request, Response } from "express";
import { PlantsSearcher } from "../../../../src/PlantManager/Plants/Application/Search/PlantsSearcher";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { PlantsGetController } from "../../controllers/Plants/PlantsGetController";

const router = Router();
// Dependencies for creating a plant
const mongoPlantRepository = new MongoPlantRepository();
const plantsFinder = new PlantsSearcher(mongoPlantRepository);
const plantsGetController = new PlantsGetController(plantsFinder);

router.get("/my-plants", (req: Request, res: Response) =>
  plantsGetController.run(req, res)
);

export default router;
