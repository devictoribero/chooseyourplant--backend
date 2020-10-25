import { Request, Response } from "express";
import { FindPlant } from "../../../../src/PlantManager/Plants/Application/Find/FindPlant";
import { Controller } from "../Controller";
import httpStatus from "http-status";

export class PlantsGetByIdController implements Controller {
  findPlantById: FindPlant;

  constructor(findPlantById: FindPlant) {
    this.findPlantById = findPlantById;
  }

  async run(req: Request, res: Response) {
    const id: string = req.params.plantId;

    await this.findPlantById
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
