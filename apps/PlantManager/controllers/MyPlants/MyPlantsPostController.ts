import { Request, Response } from "express";
import { PlantCreator } from "../../../../src/PlantManager/Plants/Application/Create/PlantCreator";
import httpStatus from "http-status";
import { Controller } from "../Controller";

export class MyPlantsPostController implements Controller {
  plantCreator: PlantCreator;

  constructor(plantCreator: PlantCreator) {
    this.plantCreator = plantCreator;
  }

  async run(req: Request, res: Response) {
    const id: string = req.body.id;
    const nickname: string = req.body.nickname;
    const imageUrl: string = req.body.imageUrl;
    const watering: any = req.body.maintenance.watering;
    const fertilization: any = req.body.maintenance.fertilization;
    const fertilizationMaitenance: any | null = fertilization
      ? {
          frequencyInDays: fertilization.frequencyInDays,
          nextFertilizationDate: fertilization.nextFertilizationDate ? new Date(fertilization.nextFertilizationDate) : null,
          lastFertilizationDate: fertilization.lastFertilizationDate ? new Date(fertilization.lastFertilizationDate) : null,
        }
      : null;

    await this.plantCreator
      .run({
        id,
        nickname,
        maintenance: {
          watering: {
            frequencyInDays: watering.frequencyInDays,
            nextWateringDate: watering.nextWateringDate ? new Date(watering.nextWateringDate) : null,
            lastWateringDate: watering.lastWateringDate ? new Date(watering.lastWateringDate) : null,
          },
          fertilization: fertilizationMaitenance,
        },
        imageUrl,
      })
      .then(() => res.status(httpStatus.CREATED).send())
      .catch((error: any) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
        error.message ? res.send({error: error.message}) : res.send({error});
      });
  }
}
