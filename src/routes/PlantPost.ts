import { Router, Request, Response } from "express";
import { PlantCreator } from "../contexts/Plants/Application/Create/PlantCreator";
import { MongoPlantRepository } from "../contexts/Plants/Infrastructure/MongoPlantRepository";
import { PlantPostController } from "../controllers/Plants/PlantsPostController";

const router = Router();

// Dependencies injected manually
const mongoPlantRepository = new MongoPlantRepository();
const plantCreator = new PlantCreator(mongoPlantRepository);
const plantPostController = new PlantPostController(plantCreator);

router.post("/plants", (req: Request, res: Response) =>
  plantPostController.run(req, res)
);

export default router;
