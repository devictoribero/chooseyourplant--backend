import { Plant } from "./Plant";
import { Nullable } from "../../../Shared/Domain/Nullable";
import { Criteria } from "../../../Shared/Domain/Criteria/Criteria";

export interface PlantRepository {
  save(plant: Plant): Promise<void>;

  find(id: String): Promise<Nullable<Plant>>;

  search(criteria: Criteria): Promise<Nullable<Array<Plant>>>;

  remove(id: String): Promise<void>;
}
