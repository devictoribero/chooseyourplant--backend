import { Request, Response } from "express";
import { PlantCreator } from "../../../../src/PlantManager/Plants/Application/Create/PlantCreator";
import httpStatus from "http-status";
import { Controller } from "../Controller";

export class PlantsPostController implements Controller {
  plantCreator: PlantCreator;

  constructor(plantCreator: PlantCreator) {
    this.plantCreator = plantCreator;
  }

  async run(req: Request, res: Response) {
    await this.plantCreator
      .run(this.mapControllerRequestToPlantCreatorRequest(req))
      .then(() => res.status(httpStatus.CREATED).send()) 
      .catch((error: any) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
        error.message ? res.send({error: error.message}) : res.send({error});
      });
  }

  private mapControllerRequestToPlantCreatorRequest(req: Request) {
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
