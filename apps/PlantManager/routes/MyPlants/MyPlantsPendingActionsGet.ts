import { Router, Request, Response } from "express";
import { PlantsFinder } from "../../../../src/PlantManager/Plants/Application/Find/PlantsFinder";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { MyPlantsPendingActionsGetController } from "../../controllers/MyPlants/MyPlantsPendingActionsGetController";

const router = Router();
// Dependencies for creating a plant
const mongoPlantRepository = new MongoPlantRepository();
const plantsFinder = new PlantsFinder(mongoPlantRepository);
const myPlantsPendingActionsGetController = new MyPlantsPendingActionsGetController(plantsFinder);

router.get("/my-plants", (req: Request, res: Response) =>
  myPlantsPendingActionsGetController.run(req, res)
);

export default router;

