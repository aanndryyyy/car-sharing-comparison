import cars from "../../../static/data/citybee.json";
import calculateCityBeePrice from "../../../src/helpers/Calculators/CalculateCityBeePrice";
import {SearchParamsObj} from "../../../src/lib/DTO/SearchParamsObj";

describe("CityBee price calculator", function () {

  test("Ford Fiesta - 0min 0km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Ford Fiesta")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 0;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 0;
    searchParamsObj.minutes = 0;

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(price).toBe(0.5);
    expect(pricePackages.length).toBe(0);
  });

  test("Ford Fiesta - 30min 30km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Ford Fiesta")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 30;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 0;
    searchParamsObj.minutes = 30;

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(price).toBe(11.9);
    expect(pricePackages.length).toBe(0);
  });

  test("Ford Fiesta - 1h 26min 86km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Ford Fiesta")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 86;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 1;
    searchParamsObj.minutes = 26;

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(price).toBe(30.27);
    expect(pricePackages.length).toBe(0);
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
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(price).toBe(13.99);
    expect(pricePackages.length).toBe(0);
  });

  test("Ford Fiesta - 4h 1min 41km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Ford Fiesta")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 41;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 4;
    searchParamsObj.minutes = 1;

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(price).toBe(30.86);
    expect(pricePackages.length).toBe(2);
  });

  test("Ford Fiesta - 1day 7h 32min 431km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Ford Fiesta")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 431;
    searchParamsObj.days = 1;
    searchParamsObj.hours = 7;
    searchParamsObj.minutes = 32;

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(price).toBe(126.94);
    expect(pricePackages.length).toBe(1);
  });

  test("Ford Fiesta - 1day 2h 32min 300km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Ford Fiesta")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 300;
    searchParamsObj.days = 1;
    searchParamsObj.hours = 2;
    searchParamsObj.minutes = 32;

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    // packages sum prices: 70€ + 14.99€ = 84.99€
    // payAsYouGo left distance cost: 30km * 0.24€ = 7.2€
    // payAsYouGo left time cost: 32min * 0.14€ = 4.48€
    // totalCost: 84.99€ + 7.2€ + 4.48€ + 0.5€ = 97.17€
    expect(price).toBe(97.17);
    expect(pricePackages.length).toBe(2);
  });

  test("Ford Fiesta - 1day 3h 50min 300km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Ford Fiesta")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 300;
    searchParamsObj.days = 1;
    searchParamsObj.hours = 3;
    searchParamsObj.minutes = 50;

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    // packages sum prices: 70€ + 21.99€ + 7.99€ = 99.98€
    // payAsYouGo left distance cost: 10km * 0.24€= 2.4€
    // totalCost: 99.98€ + 2.4€ + 0.5€ = 102.88€
    expect(price).toBe(102.88);
    expect(pricePackages.length).toBe(3);
  });

  test("Toyota Corolla - 1day 9h 30min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Toyota Corolla")))
    const searchParamsObj = new SearchParamsObj()
    searchParamsObj.distance = 0
    searchParamsObj.days = 1
    searchParamsObj.hours = 9
    searchParamsObj.minutes = 30

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(price).toBe(69.48);
    expect(pricePackages.length).toBe(0);
  });

  test("Toyota Corolla - 5min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Toyota Corolla")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 0;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 0;
    searchParamsObj.minutes = 5;

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(price).toBe(1.35);
    expect(pricePackages.length).toBe(0);
  });

  test("Toyota Corolla - 1h 9km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Toyota Corolla")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 9;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 1;
    searchParamsObj.minutes = 0;

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(price).toBe(10.24);
    expect(pricePackages.length).toBe(0);
  });

  test("Toyota Corolla - 1day 9h 9km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Toyota Corolla")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 9;
    searchParamsObj.days = 1;
    searchParamsObj.hours = 9;
    searchParamsObj.minutes = 0;

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(price).toBe(71.73);
    expect(pricePackages.length).toBe(0);
  });

  test("Toyota Corolla - 50min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Toyota Corolla")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 0;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 0;
    searchParamsObj.minutes = 50;

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(price).toBe(7.99);
    expect(pricePackages.length).toBe(0);
  });

  test("Toyota Corolla - 59min 20km", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "Toyota Corolla")))
    const searchParamsObj = new SearchParamsObj();
    searchParamsObj.distance = 20;
    searchParamsObj.days = 0;
    searchParamsObj.hours = 0;
    searchParamsObj.minutes = 59;

    // ACT
    const {price, pricePackages} = calculateCityBeePrice(car, searchParamsObj);

    // ASSERT
    expect(price).toBe(12.99);
    expect(pricePackages.length).toBe(0);
  });
});
