import { Request, Response } from "express";
import { SearchTasks } from "../../../../src/PlantManager/Tasks/Application/Search/SearchTasks";
import { Controller } from "../Controller";
import httpStatus from "http-status";

export class TasksGetController implements Controller {
  searchTasks: SearchTasks;

  constructor(searchTasks: SearchTasks) {
    this.searchTasks = searchTasks;
  }

  async run(req: Request, res: Response) {
    // @ts-ignore
    const from: any = req.query.from ? new Date(req.query.from) : undefined
    // @ts-ignore
    const to: anny = req.query.to ? new Date(req.query.to) : undefined
    // @ts-ignore
    const type: string = req.query.type?.toUpperCase()
    // @ts-ignore
    const status: string = req.query.status?.toUpperCase()
    // @ts-ignore
    const plantId: string = req.query.plantId

    await this.searchTasks
      .run({from, to, status, type, plantId})
      .then(tasks => {
        tasks 
          ? res.status(httpStatus.OK).send(tasks)
          : res.status(httpStatus.NOT_FOUND).send()
      })
      .catch((error: any) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      );
  }
}
