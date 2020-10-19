import { Request, Response } from "express";
import { PlantEraser } from "../../../../src/PlantManager/Plants/Application/Delete/PlantEraser";
import httpStatus from "http-status";
import { Controller } from "../Controller";

export class MyPlantsDeleteController implements Controller {
  plantEraser: PlantEraser;

  constructor(plantEraser: PlantEraser) {
    this.plantEraser = plantEraser;
  }

  async run(req: Request, res: Response) {
    const id: string = req.params.plantId;

    await this.plantEraser
      .run({id})
      .then(() => res.status(httpStatus.NO_CONTENT).send())
      .catch((error: any) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
        error.message ? res.send({error: error.message}) : res.send({error});
      });
  }
}
