import { Request, Response } from "express";
import { PlantCreator } from "../../../../src/PlantManager/Plants/Application/Create/PlantCreator";
import httpStatus from "http-status";
import { Controller } from "../Controller";

export class MyPlantsPostController implements Controller {
  plantCreator: PlantCreator;

  constructor(plantCreator: PlantCreator) {
    this.plantCreator = plantCreator;
  }

  /*
   * @req.body
   * @req.body.id (string) | required
   * @req.body.nickname (string) | required
   * @req.body.maintenance (object) | required
   * @req.body.maintenance.watering (object) | required
   * @req.body.maintenance.watering.frequencyInDays (number) | required
   * @req.body.maintenance.watering.nextWateringDate (number) | required
   * @req.body.maintenance.watering.lastWateringDate (number) | required
   * @req.body.maintenance.fertilization (object) | optional
   * @req.body.maintenance.fertilization.frequencyInDays (number) | required
   * @req.body.maintenance.fertilization.nextFertilizationDate (number) | required
   * @req.body.maintenance.fertilization.lastFertilizationDate (number) | required
   * @req.body.imageUrl (string) | required
   */
  async run(req: Request, res: Response) {
    const id: string = req.body.id;
    const nickname: string = req.body.nickname;
    const imageUrl: string = req.body.imageUrl;
    const watering: any = req.body.maintenance.watering;
    const fertilization: any = req.body.maintenance.fertilization;
    const fertilizationMaitenance: any | null = fertilization
      ? {
          frequencyInDays: fertilization.frequencyInDays,
          nextFertilizationDate: fertilization.nextFertilizationDate,
          lastFertilizationDate: fertilization.lastFertilizationDate,
        }
      : null;

    await this.plantCreator
      .run({
        id,
        nickname,
        maintenance: {
          watering: {
            frequencyInDays: watering.frequencyInDays,
            nextWateringDate: watering.nextWateringDate,
            lastWateringDate: watering.lastWateringDate,
          },
          fertilization: fertilizationMaitenance,
        },
        imageUrl,
      })
      .then(() => res.status(httpStatus.CREATED).send())
      .catch((error: any) => {
        console.log("asdasd");
        res.status(httpStatus.INTERNAL_SERVER_ERROR);
        error.message ? res.send(error.message) : res.send(error);
      });
  }
}
