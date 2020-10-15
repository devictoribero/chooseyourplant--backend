import { StringValueObject } from "../../../Shared/Domain/ValueObject/StringValueObject";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";

export class PlantNickname extends StringValueObject {
  constructor(nickname: string) {
    super(nickname);
    this.ensureLengthIsLongerThan2Characters(nickname);
  }

  private ensureLengthIsLongerThan2Characters(value: string): void {
    if (value.length < 2) {
      throw new InvalidArgumentError(
        `The Plant Nickname <${value}> has less than 2 characters`
      );
    }
  }
}
