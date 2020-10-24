import { Schema, model } from "mongoose";

// Mongoose auto generates an `_id` field for all instances.
// I wanted to overwrite it, but looks it doesn't work
// So I created another field called `id`.
export const taskSchema = new Schema({
  id: {type: String, required: true, unique: true},
  date: {type: String, required: true},
  type: {type: String, required: true},
  plant: {type: Object, required: true },
  status: {type: String, required: true },
});

export const MongoTaskModel = model("task", taskSchema);
export default MongoTaskModel;
