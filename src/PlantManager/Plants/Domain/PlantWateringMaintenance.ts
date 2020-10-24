import dayjs from "dayjs";

export class PlantWateringMaintenance {
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
      this.lastWateringDate = this.convertDateToMidnight(lastWateringDate);
      this.nextWateringDate = this.convertDateToMidnight(
        nextWateringDate ||
        this.incrementDays(lastWateringDate, frequencyInDays)
      )
    } else {
      this.lastWateringDate = null;
      this.nextWateringDate =  this.convertDateToMidnight(
        nextWateringDate ||
        this.incrementDays(new Date(), frequencyInDays)
      )
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

  private incrementDays(date: Date, days: number): Date {
    const dateMidNight = this.convertDateToMidnight(date)
    const dateIncremented = dayjs(dateMidNight).add(days, "day").format();
    return new Date(dateIncremented);
  }

  private convertDateToMidnight(date: Date): Date {
    return new Date(date.setHours(0,0,0,0))
  }
}
