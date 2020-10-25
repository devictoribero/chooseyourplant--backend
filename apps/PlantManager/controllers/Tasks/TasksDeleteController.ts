import { Request, Response } from "express";
import { DeleteTask } from "../../../../src/PlantManager/Tasks/Application/Delete/DeleteTask";
import httpStatus from "http-status";
import { Controller } from "../Controller";

export class TasksDeleteController implements Controller {
  deleteTask: DeleteTask;

  constructor(deleteTask: DeleteTask) {
    this.deleteTask = deleteTask;
  }

  async run(req: Request, res: Response) {
    const id: string = req.params.plantId;

    await this.deleteTask
      .run({id})
      .then(() => res.status(httpStatus.NO_CONTENT).send())
      .catch((error: any) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
        error.message ? res.send({error: error.message}) : res.send({error});
      });
  }
}
