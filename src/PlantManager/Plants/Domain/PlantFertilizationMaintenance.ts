import dayjs from "dayjs";

enum FERTILIZATION_FREQUENCY {
  WEEKLY = 7,
  BIWEEKLY = 14,
  MONTHLY = 28,
}

export type FertilizationMaintenanceType = {
  frequencyInDays: FERTILIZATION_FREQUENCY;
  nextFertilizationDate: Date;
  lastFertilizationDate?: Date;
};

export class PlantFertilizationMaintenance {
  private frequencyInDays: FERTILIZATION_FREQUENCY;
  private lastFertilizationDate: Date | null;
  private nextFertilizationDate: Date;

  constructor(
    frequencyInDays: FERTILIZATION_FREQUENCY,
    lastFertilizationDate: Date | null = null,
    nextFertilizationDate: Date | null = null,
  ) {
    this.frequencyInDays = frequencyInDays;

    if (lastFertilizationDate) {
      this.lastFertilizationDate = lastFertilizationDate;
      this.nextFertilizationDate = nextFertilizationDate ||
        this.incrementDays(lastFertilizationDate, frequencyInDays);
    } else {
      this.lastFertilizationDate = null;
      this.nextFertilizationDate = nextFertilizationDate ||
        this.incrementDays(new Date(), frequencyInDays)
    }
  }

  public getFrequencyInDays(): number {
    return this.frequencyInDays;
  }

  public getNextFertilizationDate(): Date {
    return this.nextFertilizationDate;
  }

  public getLastFertilizationDate(): Date | null {
    return this.lastFertilizationDate;
  }

  private incrementDays(date: Date, days: number): Date {
    const dateIncremented = dayjs(date).add(days, "day").format();
    return new Date(dateIncremented);
  }
}
