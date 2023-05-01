import cars from "../../../static/data/elmo.json";
import calculateElmoPrice from "../../../src/helpers/Calculators/CalculateElmoPrice";
import {SearchParamsObj} from "../../../src/lib/DTO/SearchParamsObj";

describe("Elmo price calculator", function () {

  test("Volkswagen e-Up!'19 - 3801km 38day 1h 1min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Volkswagen e-Up!'19")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 3801;
    searchParamsObj.days = 38;
    searchParamsObj.hours = 1;
    searchParamsObj.minutes = 1;

    // ACT
    let result = calculateElmoPrice(car, searchParamsObj);

    // ASSERT
    expect(Number(result.toFixed(2))).toBe(974.81);
  });

  test("Volkswagen e-Up!'19 - 28day ", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Volkswagen e-Up!'19")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 0;
    searchParamsObj.days = 28;
    searchParamsObj.hours = 0;
    searchParamsObj.minutes = 0;

    // ACT
    let result = calculateElmoPrice(car, searchParamsObj);

    // ASSERT
    expect(Number(result.toFixed(2))).toBe(700);
  });
  test("Volkswagen e-Up!'19 -  6day 23h 59min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Volkswagen e-Up!'19")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 0;
    searchParamsObj.days = 6;
    searchParamsObj.hours = 23;
    searchParamsObj.minutes = 59;

    // ACT
    let result = calculateElmoPrice(car, searchParamsObj);

    // ASSERT
    expect(Number(result.toFixed(2))).toBe(225);
  });

  test("Volkswagen e-Up!'19 -  23h 59min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Volkswagen e-Up!'19")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 0;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 23;
    searchParamsObj.minutes = 59;

    // ACT
    let result = calculateElmoPrice(car, searchParamsObj);

    // ASSERT
    expect(Number(result.toFixed(2))).toBe(33);
  });

  test("Volkswagen e-Up!'19 -  23h 59min 101km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Volkswagen e-Up!'19")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 101;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 23;
    searchParamsObj.minutes = 59;

    // ACT
    let result = calculateElmoPrice(car, searchParamsObj);

    // ASSERT
    expect(Number(result.toFixed(2))).toBe(53.1);
  });
});
