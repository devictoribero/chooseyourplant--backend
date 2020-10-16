import { WateringMaintenance } from "../../../../src/PlantManager/Maintenance/Domain/WateringMaintenance";

describe("WateringMaintenance Domain Model ----", () => {
  describe('WateringMaintenance is instanced correctly with a the most basic watering maintenance information', () => {
    it(`
        GIVEN
          frequencyInDays: 4
        THEN
          the watering frequencyInDays must be 4
          the watering frequencyInDays must be 4
          the watering frequencyInDays must be 4
      `, () => {
      // GIVEN
      const watering = new WateringMaintenance(4);
      // THEN
      expect(watering.getFrequencyInDays()).toEqual(4);
    });
  })

  describe('WateringMaintenance is instanced correctly given a lastWateringDate', () => {
    it(`
        GIVEN
          frequencyInDays: 4,
          lastWateringDate: '2020-10-16T14:46:00.000Z'
        THEN
          the lastWateringDate must be '2020-10-16T14:46:00.000Z'
          the nextWateringDate must be the lastWateringDate + 4 days
          the nextWateringDate must be '2020-10-20T14:46:00.000Z'
      `, () => {
      // GIVEN
      const watering = new WateringMaintenance(4, new Date('2020-10-16T14:46:00.000Z'), null)
      // THEN
      expect(watering.getLastWateringDate()).toEqual(new Date('2020-10-16T14:46:00.000Z'))
      expect(watering.getNextWateringDate()).toEqual(new Date('2020-10-20T14:46:00.000Z'))
    });
  })

  describe('WateringMaintenance is instanced correctly given a nextWateringDate', () => {
    it(`
        GIVEN
          frequencyInDays: 4,
          nextWateringDate: '2020-10-16T14:46:00.000Z'
        THEN
          the lastWateringDate must be NULL
          the nextWateringDate must be the lastWateringDate + 4 days
          the nextWateringDate must be '2020-10-16T14:46:00.000Z'
      `, () => {
      // GIVEN
      const watering = new WateringMaintenance(4, null, new Date('2020-10-16T14:46:00.000Z'))
      // THEN
      expect(watering.getLastWateringDate()).toEqual(null)
      expect(watering.getNextWateringDate())
        .toEqual(new Date('2020-10-16T14:46:00.000Z'))
    });
  })

  describe('WateringMaintenance is instanced correctly given a complete watering specification', () => {
    it(`
        GIVEN
          frequencyInDays: 4,
          lastWateringDate: '2020-10-16T14:46:00.000Z',
          nextWateringDate: '2020-10-20T14:46:00.000Z'
        THEN
          the watering frequencyInDays must be 4
          the lastWateringDate must be '2020-10-16T14:46:00.000Z'
          the nextWateringDate must be '2020-10-20T14:46:00.000Z'
      `, () => {
        // GIVEN
        const watering = new WateringMaintenance(
          4,
          new Date("2020-10-16T14:46:00.000Z"),
          new Date('2020-10-20T14:46:00.000Z'),
        )
        // THEN
        expect(watering.getLastWateringDate())
          .toEqual(new Date('2020-10-16T14:46:00.000Z'))
        expect(watering.getNextWateringDate())
          .toEqual(new Date('2020-10-20T14:46:00.000Z'))
      });
    })
});
