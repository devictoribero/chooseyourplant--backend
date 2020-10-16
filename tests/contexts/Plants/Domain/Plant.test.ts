import { Uuid } from "../../../../src/Shared/Domain/ValueObject/Uuid";
import { PlantId } from "../../../../src/PlantManager/Plants/Domain/PlantId";
import { PlantNickname } from "../../../../src/PlantManager/Plants/Domain/PlantNickname";
import { WateringMaintenance } from "../../../../src/PlantManager/Maintenance/Domain/WateringMaintenance";
import { FertilizationMaintenance } from "../../../../src/PlantManager/Maintenance/Domain/FertilizationMaintenance";
import { Maintenance } from "../../../../src/PlantManager/Maintenance/Domain/Maintenance";
import { Plant } from "../../../../src/PlantManager/Plants/Domain/Plant";
import dayjs from 'dayjs'

describe("Plant Domain Model ----", () => {
  describe('Plant is instanced correctly with a the most basic watering maintenance information', () => {
    it(`
        GIVEN
          id = "7f41881c-70ec-462c-9489-b83902d4972e"
          nickname = "My Princess"
          maintenance = {
            watering: {
              frequencyInDays: 4
            }
          }
        THEN
          the plant must be initialized correctly
          the watering frequencyInDays must be 4
          the next watering date has been initialized to today + 4 days
          the last watering date must be null
      `, () => {
      const id = "7f41881c-70ec-462c-9489-b83902d4972e"
      const plant = new Plant(
          new PlantId(id),
          new PlantNickname("My Princess"),
          new Maintenance(
            new WateringMaintenance(4)
          )
      );
  
      expect(plant.getId()).toEqual(id);
      expect(plant.getNickname()).toEqual("My Princess");
  
      // We store it in a variable to keep using it and save lines of code
      const plantWatering = plant.getMaintenance().getWateringMaintenance()
      expect(plantWatering.getFrequencyInDays()).toEqual(4)
  
      const dateWithDaysIncremented = incrementDays(new Date(), 4)
      expect(plantWatering.getNextWateringDate()).toEqual(dateWithDaysIncremented)
      expect(plantWatering.getLastWateringDate()).toEqual(null)
    });
  })

  describe('Plant is instanced correctly given a basic watering and lastWateringDate', () => {
    it(`
        GIVEN
          id = "7f41881c-70ec-462c-9489-b83902d4972e"
          nickname = "My Princess"
          maintenance = {
            watering: {
              frequencyInDays: 4,
              lastWateringDate: '2020-10-16T07:41:59.983Z'
            }
          }
        THEN
          the plant must be initialized correctly
          the lastWateringDate must be '2020-10-16T07:41:59.983Z'
          the nextWateringDate must be the lastWateringDate + 4
          the nextWateringDate must be '2020-10-20T07:41:59.983Z'
      `, () => {
      const id = "7f41881c-70ec-462c-9489-b83902d4972e"
      const plant = new Plant(
          new PlantId(id),
          new PlantNickname("My Princess"),
          new Maintenance(
            new WateringMaintenance(4, null, new Date('2020-10-16T07:41:59.983Z')),
          )
      );
  
      // We store it in a variable to keep using it and save lines of code
      const plantWatering = plant.getMaintenance().getWateringMaintenance()
      expect(plantWatering.getLastWateringDate()).toEqual(null)
      expect(plantWatering.getNextWateringDate()).toEqual(new Date('2020-10-16T07:41:59.983Z'))
    });
  })

  describe('Plant is instanced correctly given a complete watering specification', () => {
    it(`
        GIVEN
          id = "7f41881c-70ec-462c-9489-b83902d4972e"
          nickname = "My Princess"
          maintenance = {
            watering: {
              frequencyInDays: 4,
              lastWateringDate: '2020-10-16T07:41:59.983Z',
              nextWateringDate: '2020-10-20T07:41:59.983Z'
            }
          }
        THEN
          the plant must be initialized correctly
          the watering frequencyInDays must be 4
          the lastWateringDate must be '2020-10-16T07:41:59.983Z'
          the nextWateringDate must be '2020-10-20T07:41:59.983Z'
      `, () => {
        const id = "7f41881c-70ec-462c-9489-b83902d4972e"
        const plant = new Plant(
            new PlantId(id),
            new PlantNickname("My Princess"),
            new Maintenance(
              new WateringMaintenance(
                4,
                new Date("2020-10-16T07:41:59.983Z"),
                new Date('2020-10-20T07:41:59.983Z'),
              ),
            )
        );
        
        // We store it in a variable to keep using it and save lines of code
        const plantWatering = plant.getMaintenance().getWateringMaintenance()
        expect(plantWatering.getLastWateringDate()).toEqual(new Date('2020-10-16T07:41:59.983Z'))
        expect(plantWatering.getNextWateringDate()).toEqual(new Date('2020-10-20T07:41:59.983Z'))
      });
    })

  describe('Plant is instanced correctly given a fertilization frequency in days', () => {
  it(`
      GIVEN
        id = "7f41881c-70ec-462c-9489-b83902d4972e"
        nickname = "My Princess"
        maintenance = {
          watering: {
            frequencyInDays: 4,
            lastWateringDate: '2020-10-16T07:41:59.983Z',
            nextWateringDate: '2020-10-20T07:41:59.983Z'
          },
          fertilization: {
            frequencyInDays: 7,
          }
        }
      THEN
        the plant must be initialized correctly
        the lastWateringDate must be '2020-10-16T07:41:59.983Z'
        the nextWateringDate must be '2020-10-20T07:41:59.983Z'
    `, () => {
      const id = "7f41881c-70ec-462c-9489-b83902d4972e"
      const plant = new Plant(
          new PlantId(id),
          new PlantNickname("My Princess"),
          new Maintenance(
            new WateringMaintenance(
              4,
              new Date("2020-10-16T07:41:59.983Z"),
              new Date('2020-10-20T07:41:59.983Z'),
            ),
            new FertilizationMaintenance(7),
          )
      );

      // We store it in a variable to keep using it and save lines of code
      const plantFertilization = plant.getMaintenance().getFertilizationMaintenance()
      expect(plantFertilization?.getFrequencyInDays()).toEqual(7)
      expect(plantFertilization?.getLastFertilizationDate()).toEqual(null)
      const dateWithDaysIncremented = incrementDays(new Date(), 7)
      expect(plantFertilization?.getNextFertilizationDate()).toEqual(dateWithDaysIncremented)
    });
  })
});

function incrementDays(date: Date, days: number): Date {
  const dateIncremented = dayjs(date).add(days, "day").format();
  return new Date(dateIncremented);
}
