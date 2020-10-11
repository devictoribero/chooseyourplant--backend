import dayjs from "dayjs";

export class WaterMaintenance {
  private frequencyInDays: number;
  private nextWateringDate: Date;
  private lastWateringDate?: Date;

  constructor(
    frequencyInDays: number,
    lastWateringDate?: Date,
    nextWateringDate?: Date
  ) {
    this.frequencyInDays = frequencyInDays;

    if (nextWateringDate) {
      this.nextWateringDate = nextWateringDate;
    }

    if (lastWateringDate) {
      this.lastWateringDate = lastWateringDate;
    }
    // If the last time a plant was watered is specified
    // but the next time is not, we calculate it
    if (lastWateringDate && !nextWateringDate) {
      this.nextWateringDate = this.incrementDays(
        lastWateringDate,
        frequencyInDays
      );
    }
  }

  incrementDays(date: Date, days: number): Date {
    const dateIncremented = dayjs(date).add(days, "day").format();
    return new Date(dateIncremented);
  }
}
