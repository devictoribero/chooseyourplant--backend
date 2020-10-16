import { FertilizationMaintenance } from "../../../../src/PlantManager/Maintenance/Domain/FertilizationMaintenance";

describe("FertilizationMaintenance Domain Model ----", () => {
  describe('FertilizationMaintenance is instanced correctly with a the most basic Fertilization maintenance information', () => {
    it(`
        GIVEN
          frequencyInDays: 4
        THEN
          the Fertilization frequencyInDays must be 4
      `, () => {
      // GIVEN
      const fertilizationMaintenance = new FertilizationMaintenance(4);
      // THEN
      expect(fertilizationMaintenance.getFrequencyInDays()).toEqual(4);
    });
  })

  describe('FertilizationMaintenance is instanced correctly given a lastFertilizationDate', () => {
    it(`
        GIVEN
          frequencyInDays: 4,
          lastFertilizationDate: '2020-10-16T07:41:59.983Z'
        THEN
          the lastFertilizationDate must be '2020-10-16T07:41:59.983Z'
          the nextFertilizationDate must be the lastFertilizationDate + 4 days
          the nextFertilizationDate must be '2020-10-20T07:41:59.983Z'
      `, () => {
        // GIVEN
      const fertilizationMaintenance = new FertilizationMaintenance(4, null, new Date('2020-10-16T07:41:59.983Z'))
      // THEN
      expect(fertilizationMaintenance.getLastFertilizationDate()).toEqual(null)
      expect(fertilizationMaintenance.getNextFertilizationDate()).toEqual(new Date('2020-10-16T07:41:59.983Z'))
    });
  })

  describe('FertilizationMaintenance is instanced correctly given a complete Fertilization specification', () => {
    it(`
        GIVEN
          frequencyInDays: 4,
          lastFertilizationDate: '2020-10-16T07:41:59.983Z',
          nextFertilizationDate: '2020-10-20T07:41:59.983Z'
        THEN
          the Fertilization frequencyInDays must be 4
          the lastFertilizationDate must be '2020-10-16T07:41:59.983Z'
          the nextFertilizationDate must be '2020-10-20T07:41:59.983Z'
      `, () => {
        // GIVEN
        const fertilizationMaintenance = new FertilizationMaintenance(
          4,
          new Date("2020-10-16T07:41:59.983Z"),
          new Date('2020-10-20T07:41:59.983Z'),
        )
        // THEN
        expect(fertilizationMaintenance.getLastFertilizationDate()).toEqual(new Date('2020-10-16T07:41:59.983Z'))
        expect(fertilizationMaintenance.getNextFertilizationDate()).toEqual(new Date('2020-10-20T07:41:59.983Z'))
      });
    })
});
