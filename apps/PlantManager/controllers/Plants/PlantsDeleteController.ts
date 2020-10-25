import { Request, Response } from "express";
import { DeletePlant } from "../../../../src/PlantManager/Plants/Application/Delete/DeletePlant";
import httpStatus from "http-status";
import { Controller } from "../Controller";

export class PlantsDeleteController implements Controller {
  deletePlant: DeletePlant;

  constructor(deletePlant: DeletePlant) {
    this.deletePlant = deletePlant;
  }

  async run(req: Request, res: Response) {
    const id: string = req.params.plantId;

    await this.deletePlant
      .run({id})
      .then(() => res.status(httpStatus.NO_CONTENT).send())
      .catch((error: any) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
        error.message ? res.send({error: error.message}) : res.send({error});
      });
  }
}
