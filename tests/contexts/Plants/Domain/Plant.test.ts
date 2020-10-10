import { Plant } from "../../../../src/contexts/Plants/Domain/Plant";

describe("Plant", () => {
  it("should return a new plant instance", () => {
    const id = "afsacgsfg";
    const nickname = "My princess";
    const name = "ZZ plannt";
    const plant = new Plant(id, nickname, name);

    expect(plant.id).toEqual(id);
    expect(plant.nickname).toEqual(nickname);
    expect(plant.name).toEqual(name);
  });
});
