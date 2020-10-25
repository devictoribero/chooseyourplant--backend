import { Request, Response } from "express";
import { TaskEraser } from "../../../../src/PlantManager/Tasks/Application/Delete/TaskEraser";
import httpStatus from "http-status";
import { Controller } from "../Controller";

export class TasksDeleteController implements Controller {
  taskEraser: TaskEraser;

  constructor(taskEraser: TaskEraser) {
    this.taskEraser = taskEraser;
  }

  async run(req: Request, res: Response) {
    const id: string = req.params.plantId;

    await this.taskEraser
      .run({id})
      .then(() => res.status(httpStatus.NO_CONTENT).send())
      .catch((error: any) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
        error.message ? res.send({error: error.message}) : res.send({error});
      });
  }
}
