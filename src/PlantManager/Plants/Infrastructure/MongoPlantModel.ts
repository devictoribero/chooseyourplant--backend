import { Schema, model } from "mongoose";

// Mongoose auto generates an `_id` field for all instances.
// I wanted to overwrite it, but looks it doesn't work
// So I created another field called `id`.
export const plantSchema = new Schema({
  id: { type: String, required: true, unique: true },
  nickname: { type: String, required: true },
  maintenance: {
    type: {
      watering: {
        type: {
          frequencyInDays: {type: Number, required: true},
          lastWateringDate: {type: Date, default: null},
          nextWateringDate: {type: Date, default: null}
        },
        required: true
      },
      fertilization: {
        type: {
          frequencyInDays: {type: Number, required: true},
          lastFertilizationDate: {type: Date, default: null},
          nextFertilizationDate: {type:Date, default: null}
        },
        required: false,
        default: null
      },
    },
    required: true
  },
  imageUrl: {type: String, default: null}
});

export const MongoPlantModel = model("plant", plantSchema);
export default MongoPlantModel;
