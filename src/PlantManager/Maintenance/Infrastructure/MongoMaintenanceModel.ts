import { Schema } from "mongoose";

export const MaintenanceSchemaType = {
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
}

export const MaintenanceSchema = new Schema(MaintenanceSchemaType);
