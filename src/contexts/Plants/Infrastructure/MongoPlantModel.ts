import { Schema, model } from "mongoose";

// Mongoose auto generates a `_id` field for all instances.
// I'm generating the `uuid` in the fronntend and saving them
// on the `id` field
export const plantSchema = new Schema({
  id: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  name: { type: String, required: false },
});

export const MongoPlantModel = model("plant", plantSchema);
export default MongoPlantModel;
