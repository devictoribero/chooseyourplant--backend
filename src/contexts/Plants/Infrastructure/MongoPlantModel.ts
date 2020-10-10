import { Schema, model } from "mongoose";

// Mongoose auto generates an `_id` field for all instances.
// I wanted to overwrite it, but looks it doesn't work
// So I created another field called `id`.
export const plantSchema = new Schema({
  id: { type: String, required: true },
  nickname: { type: String, required: true },
  name: { type: String, required: false },
});

export const MongoPlantModel = model("plant", plantSchema);
export default MongoPlantModel;
