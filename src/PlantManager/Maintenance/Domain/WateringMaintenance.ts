import dayjs from "dayjs";

export class WateringMaintenance {
  private frequencyInDays: number;
  private lastWateringDate: Date | null;
  private nextWateringDate: Date;

  constructor(
    frequencyInDays: number,
    lastWateringDate: Date | null = null,
    nextWateringDate: Date | null = null,
  ) {
    this.frequencyInDays = frequencyInDays;
    this.lastWateringDate = lastWateringDate;
    
    if (lastWateringDate) {
      this.lastWateringDate = lastWateringDate;
      this.nextWateringDate = nextWateringDate ||
        this.incrementDays(lastWateringDate, frequencyInDays);
    } else {
      this.lastWateringDate = null;
      this.nextWateringDate =  nextWateringDate ||
        this.incrementDays(new Date(), frequencyInDays);
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

  public markAsWatered(): void {
    // update the last time the plant has been watered to now
    const now = new Date();
    this.updateLastWateringDate(now);

    // calculate next watering time from now
    this.updateNextWateringDate(
      this.incrementDays(now, this.getFrequencyInDays())
    );
  }

  public updateNextWateringDate(date: Date): void {
    this.nextWateringDate = date;
  }

  public updateLastWateringDate(date: Date): void {
    this.lastWateringDate = date;
  }

  private incrementDays(date: Date, days: number): Date {
    const dateIncremented = dayjs(date).add(days, "day").format();
    return new Date(dateIncremented);
  }
}
