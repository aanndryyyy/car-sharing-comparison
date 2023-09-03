import cars from "../../../static/data/beast.json";
import calculateBeastPrice from "../../../src/helpers/calculators/calculateBeastPrice";
import {SearchParamsObj} from "../../../src/lib/DTO/SearchParamsObj";

describe("Beast price calculator", function () {

  test("Tesla Model 3 Standard Range - 30min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Tesla Model 3 Standard Range")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 0;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 0;
    searchParamsObj.minutes = 30;

    // ACT
    const result = calculateBeastPrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(13.99);
  });

  test("Tesla Model 3 Standard Range - 2 days 10h", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Tesla Model 3 Standard Range")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 0;
    searchParamsObj.days = 2;
    searchParamsObj.hours = 10;
    searchParamsObj.minutes = 0;

    // ACT
    const result = calculateBeastPrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(274.98);
  });

  test("Tesla Model 3 Standard Range - 1 week 5 days 10h", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Tesla Model 3 Standard Range")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 0;
    searchParamsObj.days = 12;
    searchParamsObj.hours = 10;
    searchParamsObj.minutes = 0;

    // ACT
    const result = calculateBeastPrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(1124.97);
  });

  test("Tesla Model 3 Standard Range - 4 days 12h 2000km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Tesla Model 3 Standard Range")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 2000;
    searchParamsObj.days = 4;
    searchParamsObj.hours = 12;
    searchParamsObj.minutes = 0;

    // ACT
    const result = calculateBeastPrice(car, searchParamsObj);

    // ASSERT
    expect(result.toFixed(2)).toBe(474.96 + "");
  });

  test("Tesla Model 3 Standard Range - 20min, 30km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Tesla Model 3 Standard Range")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 30;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 0;
    searchParamsObj.minutes = 20;

    // ACT
    const result = calculateBeastPrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(10.99);
  });

  test("Tesla Model 3 Standard Range - 1 day 1min 600km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Tesla Model 3 Standard Range")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 600;
    searchParamsObj.days = 1;
    searchParamsObj.hours = 0;
    searchParamsObj.minutes = 1;

    // ACT
    const result = calculateBeastPrice(car, searchParamsObj);

    // ASSERT
    expect(result.toFixed(2)).toBe(105.28 + "");
  });
});
