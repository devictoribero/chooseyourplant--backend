export class TimeInterval {
  private from ?: Date;
  private to ?: Date;

  constructor(from?: Date, to?: Date) {
    this.from = from;
    this.to = to;
  }

  public getFrom() : Date | undefined {
    return this.from;
  }

  public getTo(): Date | undefined {
    return this.to;
  }
}