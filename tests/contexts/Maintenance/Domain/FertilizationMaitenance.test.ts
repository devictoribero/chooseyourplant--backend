import { PlantFertilizationMaintenance } from "../../../../src/PlantManager/Plants/Domain/PlantFertilizationMaintenance";

describe("PlantFertilizationMaintenance Domain Model ----", () => {
  describe('PlantFertilizationMaintenance is instanced correctly with a the most basic Fertilization maintenance information', () => {
    it(`
        GIVEN
          frequencyInDays: 7
        THEN
          the Fertilization frequencyInDays must be 7
      `, () => {
      // GIVEN
      const fertilization = new PlantFertilizationMaintenance(7);
      // THEN
      expect(fertilization.getFrequencyInDays()).toEqual(7);
    });
  })

  describe('PlantFertilizationMaintenance is instanced correctly given a lastFertilizationDate', () => {
    it(`
        GIVEN
          frequencyInDays: 7
          lastFertilizationDate: '2020-10-16T14:46:00.000Z'
        THEN
          the lastFertilizationDate must be '2020-10-16T14:46:00.000Z'
          the nextFertilizationDate must be the lastFertilizationDate + 7 days
          the nextFertilizationDate must be '2020-10-23T14:46:00.000Z'
      `, () => {
      // GIVEN
      const fertilization = new PlantFertilizationMaintenance(7, new Date('2020-10-16T14:46:00.000Z'), null)
      // THEN
      expect(fertilization.getLastFertilizationDate())
        .toEqual(new Date('2020-10-16T14:46:00.000Z'))
      expect(fertilization.getNextFertilizationDate())
        .toEqual(new Date('2020-10-23T14:46:00.000Z'))
    });
  })

  describe('PlantFertilizationMaintenance is instanced correctly given a nextFertilizationDate', () => {
    it(`
        GIVEN
          frequencyInDays: 7
          nextFertilizationDate: '2020-10-16T14:46:00.000Z'
        THEN
          the lastFertilizationDate must be NULL
          the nextFertilizationDate must be the lastFertilizationDate + 4 days
          the nextFertilizationDate must be '2020-10-16T14:46:00.000Z'
      `, () => {
      // GIVEN
      const fertilization = new PlantFertilizationMaintenance(7, null, new Date('2020-10-16T14:46:00.000Z'))
      // THEN
      expect(fertilization.getLastFertilizationDate()).toEqual(null)
      expect(fertilization.getNextFertilizationDate())
        .toEqual(new Date('2020-10-16T14:46:00.000Z'))
    });
  })

  describe('PlantFertilizationMaintenance is instanced correctly given a complete Fertilization specification', () => {
    it(`
        GIVEN
          frequencyInDays: 7
          lastFertilizationDate: '2020-10-16T14:46:00.000Z',
          nextFertilizationDate: '2020-10-23T14:46:00.000Z'
        THEN
          the Fertilization frequencyInDays must be 7
          the lastFertilizationDate must be '2020-10-16T14:46:00.000Z'
          the nextFertilizationDate must be '2020-10-23T14:46:00.000Z'
      `, () => {
        // GIVEN
        const fertilization = new PlantFertilizationMaintenance(
          4,
          new Date("2020-10-16T14:46:00.000Z"),
          new Date('2020-10-23T14:46:00.000Z'),
        )
        // THEN
        expect(fertilization.getLastFertilizationDate())
          .toEqual(new Date('2020-10-16T14:46:00.000Z'))
        expect(fertilization.getNextFertilizationDate())
          .toEqual(new Date('2020-10-23T14:46:00.000Z'))
      });
    })
});
