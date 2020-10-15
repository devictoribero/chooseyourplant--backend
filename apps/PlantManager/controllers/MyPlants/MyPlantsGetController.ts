import { Request, Response } from "express";
import { PlantsFinder } from "../../../../src/PlantManager/Plants/Application/Find/PlantsFinder";
import { Controller } from "../Controller";
import httpStatus from "http-status";

const MAX_NUMBER_PLANTS = 30;

export class MyPlantsGetController implements Controller {
  plantsFinder: PlantsFinder;

  constructor(plantsFinder: PlantsFinder) {
    this.plantsFinder = plantsFinder;
  }

  async run(req: Request, res: Response) {
    const { query } = req;
    const count: number = query.count ? +query.count : MAX_NUMBER_PLANTS;

    await this.plantsFinder
      .run({ count })
      .then((plants) => res.status(httpStatus.OK).send(plants))
      .catch((error: any) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      );
  }
}
