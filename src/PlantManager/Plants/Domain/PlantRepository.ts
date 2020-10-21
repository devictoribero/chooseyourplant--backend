import { Plant } from "./Plant";
import { Nullable } from "../../../Shared/Domain/Nullable";

export interface PlantRepository {
  save(plant: Plant): Promise<void>;

  find(id: String): Promise<Nullable<Plant>>;

  search(limit: number): Promise<Nullable<Array<Plant>>>;

  remove(id: String): Promise<void>;
}
