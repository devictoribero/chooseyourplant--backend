import { Plant } from "./Plant";
import { Nullable } from "../../Shared/Domain/Nullable";

export interface PlantRepository {
  save(plant: Plant): Promise<void>;

  findById(id: String): Promise<Nullable<Plant>>;
}
