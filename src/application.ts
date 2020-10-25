import express from "express";
import bodyParser from "body-parser";
import PlantsGetRoute from "../apps/PlantManager/routes/Plants/PlantsGet";
import PlantsGetByIdRoute from "../apps/PlantManager/routes/Plants/PlantsGetById";
import PlantsPostRoute from "../apps/PlantManager/routes/Plants/PlantsPost";
import PlantsDeleteRoute from "../apps/PlantManager/routes/Plants/PlantsDelete";
import TasksGet from "../apps/PlantManager/routes/Tasks/TasksGet";
import TasksDeleteRoute from "../apps/PlantManager/routes/Tasks/TasksDelete";
import CompleteTaskPost from "../apps/PlantManager/routes/Tasks/CompleteTaskPost";

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
    // Plants
    this.app.use(PlantsGetRoute);
    this.app.use(PlantsGetByIdRoute);
    this.app.use(PlantsPostRoute);
    this.app.use(PlantsDeleteRoute);
    // Tasks
    this.app.use(TasksGet);
    this.app.use(TasksDeleteRoute);
    this.app.use(CompleteTaskPost);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this.port}`
      );
    });
  }
}
