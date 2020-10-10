import { Router, Request, Response } from "express";
import { PlantFinderById } from "../contexts/Plants/Application/Find/PlantFinderById";
import { MongoPlantRepository } from "../contexts/Plants/Infrastructure/MongoPlantRepository";
import { PlantsGetByIdController } from "../controllers/Plants/PlantsGetByIdController";

const router = Router();
// Dependencies for creating a plant
const mongoPlantRepository = new MongoPlantRepository();
const plantFinder = new PlantFinderById(mongoPlantRepository);
const plantsGetByIdController = new PlantsGetByIdController(plantFinder);

router.get("/plants/:id", (req: Request, res: Response) =>
  plantsGetByIdController.run(req, res)
);

export default router;
