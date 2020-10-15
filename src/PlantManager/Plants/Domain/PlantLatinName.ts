import { StringValueObject } from "../../../Shared/Domain/ValueObject/StringValueObject";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";

export class PlantNickname extends StringValueObject {
  constructor(nickname: string) {
    super(nickname);
    this.ensureLengthIsLongerThan5Characters(nickname);
  }

  private ensureLengthIsLongerThan5Characters(value: string): void {
    if (value.length < 5) {
      throw new InvalidArgumentError(
        `The Plant Nickname <${value}> has less than 5 characters`
      );
    }
  }
}
