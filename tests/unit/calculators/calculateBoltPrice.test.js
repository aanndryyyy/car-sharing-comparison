import cars from "../../../static/data/bolt.json";
import calculateBoltPrice from "../../../src/helpers/Calculators/CalculateBoltPrice";
import {minutes, days, hours} from "../../../src/lib/Store/DurationStore";
import {totalKilometres} from "../../../src/lib/Store/TotalKilometresStore";

describe("Bolt price calculator", function () {

  test("Volkswagen T-Roc - 30min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "VW T-Roc")))
    totalKilometres.set(0)
    days.set(0)
    hours.set(0)
    minutes.set(30)

    // ACT
    const result = calculateBoltPrice(car);

    // ASSERT
    expect(result).toBe(4.5);
  });
  test("Volkswagen T-Roc - 1day 9h 50min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "VW T-Roc")))
    totalKilometres.set(0)
    days.set(1)
    hours.set(9)
    minutes.set(50)

    // ACT
    const result = calculateBoltPrice(car);

    // ASSERT
    expect(result).toBe(61.8);
  });
  test("Volkswagen T-Roc -  2h 50min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "VW T-Roc")))
    totalKilometres.set(0)
    days.set(0)
    hours.set(2)
    minutes.set(50)

    // ACT
    const result = calculateBoltPrice(car);

    // ASSERT
    expect(result).toBe(20.37);
  });

  test("Volkswagen T-Roc - 10min", async () => {
    // ARRANGE
    const car = JSON.parse(JSON.stringify(cars.find(car => car.name === "VW T-Roc")))
    totalKilometres.set(0)
    days.set(0)
    hours.set(0)
    minutes.set(10)

    // ACT
    const result = calculateBoltPrice(car);

    // ASSERT
    expect(result).toBe(1.99);
  });
});
