import dayjs from "dayjs";

export class WaterMaintenance {
  private frequencyInDays: number;
  private nextWateringDate: Date;
  private lastWateringDate: Date | null;

  constructor(
    frequencyInDays: number,
    nextWateringDate: Date | null = null,
    lastWateringDate: Date | null = null
  ) {
    this.frequencyInDays = frequencyInDays;
    this.lastWateringDate = lastWateringDate;

    if (lastWateringDate) {
      this.lastWateringDate = lastWateringDate;
      this.nextWateringDate = nextWateringDate
        ? nextWateringDate
        : this.incrementDays(lastWateringDate, frequencyInDays);
    } else {
      this.lastWateringDate = null;
      this.nextWateringDate = this.incrementDays(new Date(), frequencyInDays);
    }
  }

  public getFrequencyInDays(): number {
    return this.frequencyInDays;
  }

  public getNextWateringDate(): Date {
    return this.nextWateringDate;
  }

  public getLastWateringDate(): Date | null {
    return this.lastWateringDate;
  }

  updateNextWateringDate(date: Date): void {
    this.nextWateringDate = date;
  }

  updateLastWateringDate(date: Date): void {
    this.lastWateringDate = date;
  }

  incrementDays(date: Date, days: number): Date {
    const dateIncremented = dayjs(date).add(days, "day").format();
    return new Date(dateIncremented);
  }
}
