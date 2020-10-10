import express from "express";
import getPlantsController from "./PlantTracker/controllers/GetPlants";
import createPlantController from "./PlantTracker/controllers/CreatePlant";

export class Application {
  app: express.Application;
  port: Number;

  constructor(port = 8000) {
    this.app = express();
    this.port = port;
    this.initRoutes();
  }

  initRoutes() {
    this.app.use(getPlantsController);
    this.app.use(createPlantController);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this.port}`
      );
    });
  }
}
