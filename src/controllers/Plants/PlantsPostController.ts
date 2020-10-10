import { Request, Response } from "express";
import { PlantCreator } from "../../contexts/Plants/Application/Create/PlantCreator";
import { CreatePlantRequest } from "../../contexts/Plants/Application/Create/CreatePlantRequest";
import httpStatus from "http-status";
import { Controller } from "../Controller";

export class PlantPostController implements Controller {
  plantCreator: PlantCreator;

  constructor(plantCreator: PlantCreator) {
    this.plantCreator = plantCreator;
  }

  async run(req: Request, res: Response) {
    const id: string = req.body.id;
    const nickname: string = req.body.nickname;
    const name: string = req.body.name;
    const createPlantRequest = new CreatePlantRequest(id, nickname, name);

    await this.plantCreator
      .run(createPlantRequest)
      .then(() => res.status(httpStatus.CREATED).send({ id }))
      .catch((error: any) => {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
      });
  }
}
