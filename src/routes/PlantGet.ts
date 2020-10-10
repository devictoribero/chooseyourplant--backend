import { Router, Request, Response } from "express";
import { PlantFinderById } from "../contexts/Plants/Application/Find/PlantFinderById";
import { MongoPlantRepository } from "../contexts/Plants/Infrastructure/MongoPlantRepository";
import { PlantGetByIdController } from "../controllers/Plants/PlantsGetByIdController";

const router = Router();
// Dependencies for creating a plant
const mongoPlantRepository = new MongoPlantRepository();
const plantFinder = new PlantFinderById(mongoPlantRepository);
const plantGetByIdController = new PlantGetByIdController(plantFinder);

router.get("/plants/:id", (req: Request, res: Response) =>
  plantGetByIdController.run(req, res)
);

export default router;
