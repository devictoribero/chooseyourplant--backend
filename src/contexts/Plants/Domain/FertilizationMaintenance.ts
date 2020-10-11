import dayjs from "dayjs";

enum FERTILIZATION_FREQUENCY {
  WEEKLY = 7,
  BIWEEKLY = 14,
  MONTHLY = 28,
}

export class FertilizationMaintenance {
  private frequencyInDays: FERTILIZATION_FREQUENCY;
  private nextFertilizationDate: Date;
  private lastFertilizationDate: Date | null;

  constructor(
    frequencyInDays: FERTILIZATION_FREQUENCY,
    nextFertilizationDate: Date | null = null,
    lastFertilizationDate: Date | null = null
  ) {
    this.frequencyInDays = frequencyInDays;

    if (lastFertilizationDate) {
      this.lastFertilizationDate = lastFertilizationDate;
      this.nextFertilizationDate = nextFertilizationDate
        ? nextFertilizationDate
        : this.incrementDays(lastFertilizationDate, frequencyInDays);
    } else {
      this.lastFertilizationDate = null;
      this.nextFertilizationDate = this.incrementDays(
        new Date(),
        frequencyInDays
      );
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

  updateNextFertilizationDate(date: Date): void {
    this.nextFertilizationDate = date;
  }

  updateLastFertilizationDate(date: Date): void {
    this.lastFertilizationDate = date;
  }

  updateFrequency(frequencyInDays: FERTILIZATION_FREQUENCY): void {
    this.frequencyInDays = frequencyInDays;
  }

  incrementDays(date: Date, days: number): Date {
    const dateIncremented = dayjs(date).add(days, "day").format();
    return new Date(dateIncremented);
  }
}
