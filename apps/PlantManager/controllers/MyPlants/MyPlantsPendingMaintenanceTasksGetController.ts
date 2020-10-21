import { Request, Response } from "express";
import { PlantsMaintenanceNotificationsSearcher } from "../../../../src/PlantManager/Plants/Application/Search/PlantsMaintenanceNotificationsSearcher";
import { Controller } from "../Controller";
import httpStatus from "http-status";
import dayjs from 'dayjs'

export class MyPlantsPendingMaintenanceTasksGetController implements Controller {
  plantsMaintenanceNotificatiosnSearcher: PlantsMaintenanceNotificationsSearcher;

  constructor(plantsMaintenanceNotificatiosnSearcher: PlantsMaintenanceNotificationsSearcher) {
    this.plantsMaintenanceNotificatiosnSearcher = plantsMaintenanceNotificatiosnSearcher;
  }

  async run(req: Request, res: Response) {
    console.log('working')
    // We calculate the date of today
    const todayDDMMYYY = dayjs(new Date()).format('DD/MM/YYYY');
    const todayISO = new Date(todayDDMMYYY)
    // We calculate the date of today + 1
    const tomorrowDDMMYYY = dayjs(new Date()).add(1, "day").format('DD/MM/YYYY');
    const tomorrowISO = new Date(tomorrowDDMMYYY)
    // We calculate the date of today + 2
    // const todayPlusTwoDDMMYYY = dayjs(new Date()).add(2, "day").format('DD/MM/YYYY');
    // const todayPlusTwoISO = new Date(todayPlusTwoDDMMYYY)

    

    this.plantsMaintenanceNotificatiosnSearcher
      .run(todayISO, tomorrowISO)
      .then(plantsToWaterToday => {
        res.status(httpStatus.OK).send(plantsToWaterToday)
      })
      .catch((error: any) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      );
  }
}
