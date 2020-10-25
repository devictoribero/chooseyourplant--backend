import { Request, Response } from "express";
import { CreatePlant } from "../../../../src/PlantManager/Plants/Application/Create/CreatePlant";
import httpStatus from "http-status";
import { Controller } from "../Controller";

export class PlantsPostController implements Controller {
  createPlant: CreatePlant;

  constructor(createPlant: CreatePlant) {
    this.createPlant = createPlant;
  }

  async run(req: Request, res: Response) {
    await this.createPlant
      .run(this.mapControllerRequestToCreatePlantRequest(req))
      .then(() => res.status(httpStatus.CREATED).send()) 
      .catch((error: any) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
        error.message ? res.send({error: error.message}) : res.send({error});
      });
  }

  private mapControllerRequestToCreatePlantRequest(req: Request) {
    const watering: any = req.body.maintenance.watering;
    const fertilization: any = req.body.maintenance.fertilization;
    const fertilizationMaitenance: any | null = fertilization
      ? {
          frequencyInDays: fertilization.frequencyInDays,
          nextFertilizationDate: fertilization.nextFertilizationDate
            ? new Date(fertilization.nextFertilizationDate)
            : null,
          lastFertilizationDate: fertilization.lastFertilizationDate
            ? new Date(fertilization.lastFertilizationDate)
            : null,
        }
      : null;

    return {
      id: req.body.id,
      nickname: req.body.nickname,
      maintenance: {
        watering: {
          frequencyInDays: watering.frequencyInDays,
          nextWateringDate: watering.nextWateringDate
            ? new Date(watering.nextWateringDate)
            : null,
          lastWateringDate: watering.lastWateringDate
            ? new Date(watering.lastWateringDate)
            : null,
        },
        fertilization: fertilizationMaitenance,
      },
      imageUrl: req.body.imageUrl,
    }
  }
}
