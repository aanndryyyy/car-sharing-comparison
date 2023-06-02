import cars from "../../../static/data/bolt.json";
import calculateBoltPrice from "../../../src/helpers/Calculators/CalculateBoltPrice";
import {SearchParamsObj} from "../../../src/lib/DTO/SearchParamsObj";

describe("Bolt price calculator", function () {

  test("Volkswagen T-Roc - 30min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "VW T-Roc")))
    const searchParamsObj = new SearchParamsObj()
    searchParamsObj.distance = 0
    searchParamsObj.days = 0
    searchParamsObj.hours = 0
    searchParamsObj.minutes = 30

    // ACT
    const result = calculateBoltPrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(4.8);
  });
  test("Volkswagen T-Roc - 1day 9h 50min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "VW T-Roc")))
    const searchParamsObj = new SearchParamsObj()
    searchParamsObj.distance = 0
    searchParamsObj.days = 1
    searchParamsObj.hours = 9
    searchParamsObj.minutes = 50

    // ACT
    const result = calculateBoltPrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(39.8);
  });
  test("Volkswagen T-Roc -  2h 50min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "VW T-Roc")))
    const searchParamsObj = new SearchParamsObj()
    searchParamsObj.distance = 0
    searchParamsObj.days = 0
    searchParamsObj.hours = 2
    searchParamsObj.minutes = 50

    // ACT
    const result = calculateBoltPrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(19.9);
  });

  test("Volkswagen T-Roc - 10min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "VW T-Roc")))
    const searchParamsObj = new SearchParamsObj()
    searchParamsObj.distance = 0
    searchParamsObj.days = 0
    searchParamsObj.hours = 0
    searchParamsObj.minutes = 10

    // ACT
    const result = calculateBoltPrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(3.29);
  });
});
