import { Request, Response } from "express";
import { PlantsFinder } from "../../../../src/PlantManager/Plants/Application/Find/PlantsFinder";
import { Controller } from "../Controller";
import httpStatus from "http-status";

export class MyPlantsGetController implements Controller {
  pendingMaintenanceFinder: PlantsFinder;

  constructor(pendingMaintenanceFinder: PlantsFinder) {
    this.pendingMaintenanceFinder = pendingMaintenanceFinder;
  }

  async run(req: Request, res: Response) {
    await this.pendingMaintenanceFinder
      .run()
      .then((maintenanceOfPlantsyDay) => res.status(httpStatus.OK).send(maintenanceOfPlantsyDay))
      .catch((error: any) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      );
  }
}
