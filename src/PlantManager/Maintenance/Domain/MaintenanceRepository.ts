import { Plant } from "../../Plants/Domain/Plant";
import { Nullable } from "../../../Shared/Domain/Nullable";
import { TimeInterval } from "../../../Shared/Domain/TimeInterval";

export interface MaintenanceRepository {
  getPlantsToWater(interval: TimeInterval): Promise<Nullable<Array<Plant>>>;

  // getPlansToFertilize(interval: TimeInterval): Promise<Nullable<Array<Plant>>>;
}