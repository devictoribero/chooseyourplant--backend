import express from "express";
import bodyParser from "body-parser";
import PlantsGetRoute from "./routes/PlantsGet";
import PlantGetRoute from "./routes/PlantGet";
import PlantPostRoute from "./routes/PlantPost";

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
    this.app.use(PlantsGetRoute);
    this.app.use(PlantGetRoute);
    this.app.use(PlantPostRoute);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this.port}`
      );
    });
  }
}
