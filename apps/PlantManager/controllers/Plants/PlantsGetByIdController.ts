import { Request, Response } from "express";
import { PlantFinder } from "../../../../src/PlantManager/Plants/Application/Find/PlantFinder";
import { Controller } from "../Controller";
import httpStatus from "http-status";

export class PlantsGetByIdController implements Controller {
  plantFinderById: PlantFinder;

  constructor(plantFinderById: PlantFinder) {
    this.plantFinderById = plantFinderById;
  }

  async run(req: Request, res: Response) {
    const id: string = req.params.plantId;

    await this.plantFinderById
      .run({ id })
      .then((plant) =>
        plant
          ? res.status(httpStatus.OK).send(plant)
          : res.status(httpStatus.NOT_FOUND).send()
      )
      .catch((error: any) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      );
  }
}
