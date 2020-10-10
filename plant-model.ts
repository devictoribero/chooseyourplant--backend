import { Schema, model } from "mongoose";

export const plantSchema = new Schema({
  latin_name: { type: String, required: true },
  name: { type: String, required: true },
});

export const Plant = model("plant", plantSchema);
export default Plant;
