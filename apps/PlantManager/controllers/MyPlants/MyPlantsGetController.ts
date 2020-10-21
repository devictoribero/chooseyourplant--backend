import { Request, Response } from "express";
import { PlantsSearcher } from "../../../../src/PlantManager/Plants/Application/Search/PlantsSearcher";
import { Controller } from "../Controller";
import httpStatus from "http-status";

const MAX_NUMBER_PLANTS = 30;

export class MyPlantsGetController implements Controller {
  plantsSearcher: PlantsSearcher;

  constructor(plantsSearcher: PlantsSearcher) {
    this.plantsSearcher = plantsSearcher;
  }

  async run(req: Request, res: Response) {
    const { query } = req;
    const limit: number = query.limit ? +query.limit : MAX_NUMBER_PLANTS;

    await this.plantsSearcher
      .run({ limit })
      .then((plants) => res.status(httpStatus.OK).send(plants))
      .catch((error: any) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      );
  }
}
