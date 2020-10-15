import { Maintenance } from "../../../Maintenance/Domain/Maintenance";

export type CreatePlantRequest = {
  id: string;
  nickname: string;
  maintenance: MaintenanceType;
  imageUrl?: string | null;
};

export type MaintenanceType = {
  watering: {
    frequencyInDays: number;
    nextWateringDate: Date;
    lastWateringDate: Date | null;
  };
  fertilization?: {
    frequencyInDays: number;
    nextFertilizationDate: Date;
    lastFertilizationDate: Date | null;
  } | null;
};
