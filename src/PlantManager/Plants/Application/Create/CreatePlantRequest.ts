export type CreatePlantRequest = {
  id: string;
  nickname: string;
  maintenance: {
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
  imageUrl?: string | null;
};

