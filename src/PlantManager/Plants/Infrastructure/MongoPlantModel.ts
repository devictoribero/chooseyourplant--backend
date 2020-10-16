import { Schema, model } from "mongoose";
import {MaintenanceSchemaType} from "../../Maintenance/Infrastructure/MongoMaintenanceModel"

// Mongoose auto generates an `_id` field for all instances.
// I wanted to overwrite it, but looks it doesn't work
// So I created another field called `id`.
export const plantSchema = new Schema({
  id: { type: String, required: true, unique: true },
  nickname: { type: String, required: true },
  maintenance: {type: MaintenanceSchemaType, required: true},
  imageUrl: {type: String, default: null}
});

export const MongoPlantModel = model("plant", plantSchema);
export default MongoPlantModel;
