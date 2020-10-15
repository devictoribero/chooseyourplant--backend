import { v4 } from "uuid";
import validate from "uuid-validate";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);

    this.value = value;
  }

  static generate(): Uuid {
    return new Uuid(v4());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${id}>`
      );
    }
  }

  public toString(): string {
    return this.value;
  }
}