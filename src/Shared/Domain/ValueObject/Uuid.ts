import { v4 } from "uuid";

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  static generate(): Uuid {
    return new Uuid(v4());
  }

  public toString(): string {
    return this.value;
  }
}
