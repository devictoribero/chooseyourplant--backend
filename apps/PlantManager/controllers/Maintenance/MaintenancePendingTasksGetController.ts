import { Request, Response } from "express";
import { MaintenanceTasksSearcher } from "../../../../src/PlantManager/Maintenance/Application/Search/MaintenanceTasksSearcher";
import { Controller } from "../Controller";
import httpStatus from "http-status";
import dayjs from 'dayjs'

export class MaintenancePendingTasksGetController implements Controller {
  maintenanceTasksSearcher: MaintenanceTasksSearcher;

  constructor(maintenanceTasksSearcher: MaintenanceTasksSearcher) {
    this.maintenanceTasksSearcher = maintenanceTasksSearcher;
  }

  async run(req: Request, res: Response) {
    // We calculate the date of today
    const todayDDMMYYY = dayjs(new Date()).format('DD/MM/YYYY');
    const todayISO = new Date(todayDDMMYYY)
    // We calculate the date of today + 1
    const tomorrowDDMMYYY = dayjs(new Date()).add(1, "day").format('DD/MM/YYYY');
    const tomorrowISO = new Date(tomorrowDDMMYYY)
    // We calculate the date of today + 2
    // const todayPlusTwoDDMMYYY = dayjs(new Date()).add(2, "day").format('DD/MM/YYYY');
    // const todayPlusTwoISO = new Date(todayPlusTwoDDMMYYY)

    

    this.maintenanceTasksSearcher
      .run({from: todayISO, to: tomorrowISO})
      .then(plantsToWaterToday => {
        res.status(httpStatus.OK).send(plantsToWaterToday)
      })
      .catch((error: any) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      );
  }
}