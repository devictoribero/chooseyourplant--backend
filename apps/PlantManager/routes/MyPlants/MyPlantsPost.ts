import { Router, Request, Response } from "express";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { PlantCreator } from "../../../../src/PlantManager/Plants/Application/Create/PlantCreator";
import { MyPlantsPostController } from "../../controllers/MyPlants/MyPlantsPostController";
import { MongoMaintenanceTaskRepository } from "../../../../src/PlantManager/Maintenance/Infrastructure/MongoMaintenanceTaskRepository";
import { MaintenanceTaskCreator } from "../../../../src/PlantManager/Maintenance/Application/Create/MaintenanceTaskCreator";

const router = Router();

// Dependencies for creating a maintenance task
const maintenanceTaskRepository = new MongoMaintenanceTaskRepository();
const maintenanceTaskCreator = new MaintenanceTaskCreator(maintenanceTaskRepository);

// Dependencies for creating a maintenance plant
const mongoPlantRepository = new MongoPlantRepository();
const plantCreator = new PlantCreator(mongoPlantRepository, maintenanceTaskCreator);
const myPlantPostController = new MyPlantsPostController(plantCreator);

router.post("/my-plants", (req: Request, res: Response) =>
  myPlantPostController.run(req, res)
);

export default router;
