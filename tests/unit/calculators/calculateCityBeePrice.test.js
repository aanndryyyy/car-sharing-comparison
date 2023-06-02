import cars from "../../../static/data/citybee.json";
import calculateCityBeePrice from "../../../src/helpers/Calculators/CalculateCityBeePrice";
import {minutes, days, hours} from "../../../src/lib/Store/DurationStore";
import {totalKilometres} from "../../../src/lib/Store/TotalKilometresStore";
import {SearchParamsObj} from "../../../src/lib/DTO/SearchParamsObj";

describe("CityBee price calculator", function () {

  test("Volkswagen T-Roc - 30min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Volkswagen T-Roc")))
    const searchParamsObj = new SearchParamsObj()
    searchParamsObj.distance = 0
    searchParamsObj.days = 1
    searchParamsObj.hours = 9
    searchParamsObj.minutes = 30

    // ACT
    let result = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(5.3);
  });

  test("Ford Fiesta - 1h 4min 31km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Ford Fiesta")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 31;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 1;
    searchParamsObj.minutes = 4;

    // ACT
    let result = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(Number(result.toFixed(2))).toBe(12.63);
  });

  test("Volkswagen T-Roc - 5min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Volkswagen T-Roc")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 0;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 0;
    searchParamsObj.minutes = 5;

    // ACT
    let result = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(2.29);
  });

  test("Volkswagen T-Roc - 1h 9km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Volkswagen T-Roc")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 9;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 1;
    searchParamsObj.minutes = 0;

    // ACT
    let result = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(9.49);
  });

  test("Volkswagen T-Roc - 1day 9h 9km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Volkswagen T-Roc")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 9;
    searchParamsObj.days = 1;
    searchParamsObj.hours = 9;
    searchParamsObj.minutes = 0;

    // ACT
    let result = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(69);
  });

  test("Volkswagen T-Roc - 50min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Volkswagen T-Roc")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 0;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 0;
    searchParamsObj.minutes = 50;

    // ACT
    let result = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(7.49);
  });

  test("Volkswagen T-Roc - 59min 20km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Volkswagen T-Roc")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 20;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 0;
    searchParamsObj.minutes = 59;

    // ACT
    let result = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(11.89);
  });
});
