import { MaintenanceTask } from "./MaintenanceTask";
import { Nullable } from "../../../Shared/Domain/Nullable";
import { TimeInterval } from "../../../Shared/Domain/TimeInterval";

export interface MaintenanceTaskRepository {
  search(
    interval: TimeInterval,
    status?: String,
    type?: String
  ): Promise<Nullable<Array<MaintenanceTask>>>;
}