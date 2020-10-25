import { Request, Response } from "express";
import { CompleteTask } from "../../../../src/PlantManager/Tasks/Application/Update/MarkTaskAsCompleted";
import { Controller } from "../Controller";
import httpStatus from "http-status";

export class CompleteTaskPostController implements Controller {
  completeTask: CompleteTask;

  constructor(completeTask: CompleteTask) {
    this.completeTask = completeTask;
  }

  async run(req: Request, res: Response) {
    await this.completeTask
      .run({ id: req.params.id })
      .then(() => res.status(httpStatus.CREATED).send()) 
      .catch((error: any) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
        error.message ? res.send({error: error.message}) : res.send({error});
      });
  }
}
