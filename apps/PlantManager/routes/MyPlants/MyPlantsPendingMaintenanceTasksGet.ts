import { Router, Request, Response } from "express";
import { PlantsMaintenanceNotificationsSearcher } from "../../../../src/PlantManager/Plants/Application/Search/PlantsMaintenanceNotificationsSearcher";
import { MongoPlantRepository } from "../../../../src/PlantManager/Plants/Infrastructure/MongoPlantRepository";
import { MyPlantsPendingMaintenanceTasksGetController } from "../../controllers/MyPlants/MyPlantsPendingMaintenanceTasksGetController";

const router = Router();
// Dependencies for creating a plant
const mongoPlantRepository = new MongoPlantRepository();
const plantsFinder = new PlantsMaintenanceNotificationsSearcher(mongoPlantRepository);
const myPlantsPendingMaintenanceTasksGetController = new MyPlantsPendingMaintenanceTasksGetController(plantsFinder);

router.get("/my-plants/maintenance", (req: Request, res: Response) =>
  myPlantsPendingMaintenanceTasksGetController.run(req, res)
);

export default router;
