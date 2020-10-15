export type CreatePlantRequest = {
  id: string;
  nickname: string;
  maintenance: MaintenanceType;
  imageUrl?: string | null;
};

export type MaintenanceType = {
  watering: {
    frequencyInDays: number;
    nextWateringDate?: Date| null;
    lastWateringDate?: Date | null;
  };
  fertilization?: {
    frequencyInDays: number;
    nextFertilizationDate?: Date| null;
    lastFertilizationDate?: Date | null;
  } | null;
};
