import { Router, Request, Response } from "express";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { CreatePlant } from "../../../../src/PlantManager/Plants/Application/Create/CreatePlant";
import { PlantsPostController } from "../../controllers/Plants/PlantsPostController";
import { MongoTaskRepository } from "../../../../src/PlantManager/Tasks/Infrastructure/MongoTaskRepository";

const router = Router();

// Dependencies for creating a maintenance task
const taskRepository = new MongoTaskRepository();

// Dependencies for creating a maintenance plant
const mongoPlantRepository = new MongoPlantRepository();
const createPlant = new CreatePlant(mongoPlantRepository, taskRepository);
const myPlantPostController = new PlantsPostController(createPlant);

router.post("/my-plants", (req: Request, res: Response) =>
  myPlantPostController.run(req, res)
);

export default router;
