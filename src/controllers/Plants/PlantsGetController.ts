import { Request, Response } from "express";
import { PlantFinder } from "../../contexts/Plants/Application/Find/PlantsFinder";
import { FindPlantsRequest } from "../../contexts/Plants/Application/Find/FindPlantsRequest";
import { Controller } from "../Controller";
import httpStatus from "http-status";

export class PlantsGetController implements Controller {
  plantFinder: PlantFinder;

  constructor(plantFinder: PlantFinder) {
    this.plantFinder = plantFinder;
  }

  async run(req: Request, res: Response) {
    const limit = req.params.limit || 20;
    const createPlantRequest = new FindPlantsRequest(limit);

    await this.plantFinder
      .run(createPlantRequest)
      .then((plants) =>
        plants
          ? res.status(httpStatus.FOUND).send(plants)
          : res.status(httpStatus.NOT_FOUND).send()
      )
      .catch((error: any) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      );
  }
}
