import { WateringMaintenance } from "../../../../src/PlantManager/Maintenance/Domain/WateringMaintenance";
import dayjs from 'dayjs'

describe("WateringMaintenance Domain Model ----", () => {
  describe('WateringMaintenance is instanced correctly with a the most basic watering maintenance information', () => {
    it(`
        GIVEN
          frequencyInDays: 4
        THEN
          the watering frequencyInDays must be 4
      `, () => {
      // GIVEN
      const wateringMaintenance = new WateringMaintenance(4);
      // THEN
      expect(wateringMaintenance.getFrequencyInDays()).toEqual(4);
    });
  })

  describe('WateringMaintenance is instanced correctly given a lastWateringDate', () => {
    it(`
        GIVEN
          frequencyInDays: 4,
          lastWateringDate: '2020-10-16T07:41:59.983Z'
        THEN
          the lastWateringDate must be '2020-10-16T07:41:59.983Z'
          the nextWateringDate must be the lastWateringDate + 4 days
          the nextWateringDate must be '2020-10-20T07:41:59.983Z'
      `, () => {
        // GIVEN
      const wateringMaintenance = new WateringMaintenance(4, null, new Date('2020-10-16T07:41:59.983Z'))
      // THEN
      expect(wateringMaintenance.getLastWateringDate()).toEqual(null)
      expect(wateringMaintenance.getNextWateringDate()).toEqual(new Date('2020-10-16T07:41:59.983Z'))
    });
  })

  describe('WateringMaintenance is instanced correctly given a complete watering specification', () => {
    it(`
        GIVEN
          frequencyInDays: 4,
          lastWateringDate: '2020-10-16T07:41:59.983Z',
          nextWateringDate: '2020-10-20T07:41:59.983Z'
        THEN
          the watering frequencyInDays must be 4
          the lastWateringDate must be '2020-10-16T07:41:59.983Z'
          the nextWateringDate must be '2020-10-20T07:41:59.983Z'
      `, () => {
        // GIVEN
        const wateringMaintenance = new WateringMaintenance(
          4,
          new Date("2020-10-16T07:41:59.983Z"),
          new Date('2020-10-20T07:41:59.983Z'),
        )
        // THEN
        expect(wateringMaintenance.getLastWateringDate()).toEqual(new Date('2020-10-16T07:41:59.983Z'))
        expect(wateringMaintenance.getNextWateringDate()).toEqual(new Date('2020-10-20T07:41:59.983Z'))
      });
    })
});
