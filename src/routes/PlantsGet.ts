import { Router, Request, Response } from "express";
import { PlantsFinder } from "../contexts/Plants/Application/Find/PlantsFinder";
import { MongoPlantRepository } from "../contexts/Plants/Infrastructure/MongoPlantRepository";
import { PlantsGetController } from "../controllers/Plants/PlantsGetController";

const router = Router();
// Dependencies for creating a plant
const mongoPlantRepository = new MongoPlantRepository();
const plantsFinder = new PlantsFinder(mongoPlantRepository);
const plantsGetController = new PlantsGetController(plantsFinder);

router.get("/plants", (req: Request, res: Response) =>
  plantsGetController.run(req, res)
);

export default router;
