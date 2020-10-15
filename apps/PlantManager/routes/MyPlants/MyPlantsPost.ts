import { Router, Request, Response } from "express";
import { PlantCreator } from "../../../../src/PlantManager/Plants/Application/Create/PlantCreator";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { MyPlantsPostController } from "../../controllers/MyPlants/MyPlantsPostController";

const router = Router();

// Dependencies injected manually
const mongoPlantRepository = new MongoPlantRepository();
const plantCreator = new PlantCreator(mongoPlantRepository);
const myPlantPostController = new MyPlantsPostController(plantCreator);

router.post("/my-plants", (req: Request, res: Response) =>
  myPlantPostController.run(req, res)
);

export default router;
