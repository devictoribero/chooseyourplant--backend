import { Plant } from "./Plant";
import { Nullable } from "../../../Shared/Domain/Nullable";
import { Criteria } from "../../../Shared/Domain/Criteria/Criteria";

export interface PlantRepository {
  save(plant: Plant, transaction: any): Promise<void>;

  find(id: string): Promise<Nullable<Plant>>;

  search(criteria: Criteria): Promise<Nullable<Array<Plant>>>;

  remove(id: string): Promise<void>;
}
