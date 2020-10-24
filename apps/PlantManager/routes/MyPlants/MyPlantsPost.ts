import { Router, Request, Response } from "express";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { PlantCreator } from "../../../../src/PlantManager/Plants/Application/Create/PlantCreator";
import { MyPlantsPostController } from "../../controllers/MyPlants/MyPlantsPostController";
import { MongoTaskRepository } from "../../../../src/PlantManager/Tasks/Infrastructure/MongoTaskRepository";
import { TaskCreator } from "../../../../src/PlantManager/Tasks/Application/Create/TaskCreator";

const router = Router();

// Dependencies for creating a maintenance task
const taskRepository = new MongoTaskRepository();

// Dependencies for creating a maintenance plant
const mongoPlantRepository = new MongoPlantRepository();
const plantCreator = new PlantCreator(mongoPlantRepository, taskRepository);
const myPlantPostController = new MyPlantsPostController(plantCreator);

router.post("/my-plants", (req: Request, res: Response) =>
  myPlantPostController.run(req, res)
);

export default router;
