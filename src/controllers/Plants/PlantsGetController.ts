import { Request, Response } from "express";
import { PlantsFinder } from "../../contexts/Plants/Application/Find/PlantsFinder";
import { FindPlantsRequest } from "../../contexts/Plants/Application/Find/FindPlantsRequest";
import { Controller } from "../Controller";
import httpStatus from "http-status";

export class PlantsGetController implements Controller {
  plantsFinder: PlantsFinder;

  constructor(plantsFinder: PlantsFinder) {
    this.plantsFinder = plantsFinder;
  }

  async run(req: Request, res: Response) {
    const count: number = parseInt(req.params.count) || 10;
    const findPlantsRequest = new FindPlantsRequest(count);

    await this.plantsFinder
      .run(findPlantsRequest)
      .then((plants) => res.status(httpStatus.OK).send(plants))
      .catch((error: any) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      );
  }
}
