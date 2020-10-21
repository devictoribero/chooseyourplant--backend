import express from "express";
import bodyParser from "body-parser";
import MyPlantsGetRoute from "../apps/PlantManager/routes/MyPlants/MyPlantsGet";
import MyPlantsGetByIdRoute from "../apps/PlantManager/routes/MyPlants/MyPlantsGetById";
import MyPlantsPostRoute from "../apps/PlantManager/routes/MyPlants/MyPlantsPost";
import MyPlantsDeleteRoute from "../apps/PlantManager/routes/MyPlants/MyPlantsDelete";
import MaintenancePendingTasksGet from "../apps/PlantManager/routes/Maintenance/MaintenancePendingTasksGet";

export class Application {
  app: express.Application;
  port: Number;

  constructor(port = 8000) {
    this.app = express();
    this.port = port;
    this.useMiddlewares();
    this.initRoutes();
  }

  useMiddlewares() {
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // parse application/json
    this.app.use(bodyParser.json());
  }

  initRoutes() {
    this.app.use(MyPlantsGetRoute);
    this.app.use(MyPlantsGetByIdRoute);
    this.app.use(MyPlantsPostRoute);
    this.app.use(MyPlantsDeleteRoute);
    this.app.use(MaintenancePendingTasksGet);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this.port}`
      );
    });
  }
}
