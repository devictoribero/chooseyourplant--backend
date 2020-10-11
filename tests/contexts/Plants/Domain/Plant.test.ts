import { Plant } from "../../../../src/contexts/Plants/Domain/Plant";

describe("Plant", () => {
  it("should return a new plant instance", () => {
    const id = "afsacgsfg";
    const nickname = "My princess";
    const commonName = "ZZ plant";
    const plant = new Plant(id, nickname, commonName);

    expect(plant.getId()).toEqual(id);
    expect(plant.getNickname()).toEqual(nickname);
    expect(plant.getCommonName()).toEqual(commonName);
  });
});
