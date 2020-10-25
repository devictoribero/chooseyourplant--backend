import { Plant } from "./Plant";
import { Nullable } from "../../../Shared/Domain/Nullable";
import { Criteria } from "../../../Shared/Domain/Criteria/Criteria";
import { PlantId } from "./PlantId";

export interface PlantRepository {
  save(plant: Plant, transaction: any): Promise<void>;

  find(id: PlantId): Promise<Nullable<Plant>>;

  search(criteria: Criteria): Promise<Nullable<Array<Plant>>>;

  remove(id: PlantId, transaction: any): Promise<void>;
}
