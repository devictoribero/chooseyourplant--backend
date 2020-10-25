import { Request, Response } from "express";
import { SearchPlants } from "../../../../src/PlantManager/Plants/Application/Search/SearchPlants";
import { Controller } from "../Controller";
import httpStatus from "http-status";

const MAX_NUMBER_PLANTS = 30;

export class PlantsGetController implements Controller {
  searchPlants: SearchPlants;

  constructor(searchPlants: SearchPlants) {
    this.searchPlants = searchPlants;
  }

  async run(req: Request, res: Response) {
    const { query } = req;
    const limit: number = query.limit ? +query.limit : MAX_NUMBER_PLANTS;

    await this.searchPlants
      .run({ limit })
      .then((plants) => res.status(httpStatus.OK).send(plants))
      .catch((error: any) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      );
  }
}
