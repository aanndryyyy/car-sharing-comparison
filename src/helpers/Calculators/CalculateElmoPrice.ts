import { calculateTime } from "./CalculatorHelper";
import type {SearchParamsObj} from "../../lib/DTO/SearchParamsObj";
import {ElmoCheapestPackage} from "../../lib/DTO/ElmoCheapestPackage";
import {ElmoPackageCalculatingData} from "../../lib/DTO/ElmoPackageCalculatingData";
import {PackageName} from "../../lib/Types/Enums/PackageName";
import type {ICar} from "../../lib/Types/Interfaces/ICar";

const calculateElmoPrice = (car: ICar, searchParamsObj: SearchParamsObj): number => {
  if (car.packages.length < 2) throw "Elmo package data broken!"
  const price = car.price;
  let distanceCost = 0;
  if (searchParamsObj.distance > 100) {
    distanceCost = 100 * price.km + (searchParamsObj.distance - 100) * 0.1;
  } else {
    distanceCost = searchParamsObj.distance * price.km;
  }
  const totalTime =
    searchParamsObj.days * 24 * 60 +
    searchParamsObj.hours * 60 +
    searchParamsObj.minutes;

  // Time
  let { daysCost, hoursCost, minutesCost } = calculateTime(totalTime, price);
  // Calculate if weeks or months package comes cheaper
  const elmoPackageCalculatingData: ElmoPackageCalculatingData = new ElmoPackageCalculatingData()
  elmoPackageCalculatingData.timeLeft = totalTime
  elmoPackageCalculatingData.distanceLeft = searchParamsObj.distance
  elmoPackageCalculatingData.price = price
  elmoPackageCalculatingData.weekPrice = car.packages[0]
  elmoPackageCalculatingData.monthPrice = car.packages[1]


  const cheapestPackage: ElmoCheapestPackage =  _calculateCheapestPackages(elmoPackageCalculatingData, new ElmoCheapestPackage());

  let monthsCost = 0;
  let weeksCost = 0;
  if (
    (cheapestPackage.months > 0 || cheapestPackage.weeks > 0) &&
      cheapestPackage.price < distanceCost + daysCost + hoursCost + minutesCost
  ) {
    const carMonthPackage = car.packages.find(p => p.name === PackageName.MONTH)
    const carWeekPackage = car.packages.find(p => p.name === PackageName.WEEK)

    monthsCost = cheapestPackage.months * carMonthPackage!.price;
    weeksCost = cheapestPackage.weeks * carWeekPackage!.price;
    daysCost = cheapestPackage.withNormalPricing.daysCost;
    hoursCost = cheapestPackage.withNormalPricing.hoursCost;
    minutesCost = cheapestPackage.withNormalPricing.minutesCost;
    distanceCost = cheapestPackage.withNormalPricing.distanceCost;
  }
  let totalCost =
    monthsCost +
    weeksCost +
    daysCost +
    hoursCost +
    minutesCost +
    distanceCost;

  if (price.min && totalCost < price.min) {
    totalCost = price.min;
  }
  // if (car.name === "Tesla Model 3 SR+" && totalCost < 30) {
  //   totalCost = 30;
  // }

  return totalCost
  // {
  //   package: {
  //     ...this.cheapest,
  //     distance: this.cheapest.months * 3000 + this.cheapest.weeks * 700,
  //   },
  //   preOrder: Math.max(0, 10 - totalCost),
  //   price: totalCost,
  // };
}

// TODO this function need refactor
// Global variable to calculate weeks and months
const _calculateCheapestPackages = (calculatingData: ElmoPackageCalculatingData, cheapest: ElmoCheapestPackage): ElmoCheapestPackage => {
  if (calculatingData.totalCost > cheapest.price) {
    return cheapest
  }
  if (calculatingData.timeLeft <= 0 && calculatingData.distanceLeft <= 0) {
    if (calculatingData.totalCost < cheapest.price) {
      cheapest.price = calculatingData.totalCost;
      cheapest.months = calculatingData.months;
      cheapest.weeks = calculatingData.weeks;
      cheapest.withNormalPricing = {
        daysCost: 0,
        hoursCost: 0,
        minutesCost: 0,
        distanceCost: 0,
      };
    }
    return cheapest;
  } else {
    if (calculatingData.months > 0 || calculatingData.weeks > 0) {
      // if we need to add some extra time to package
      let withNormalPricing = calculatingData.totalCost;
      let normalTime = {
        daysCost: 0,
        hoursCost: 0,
        minutesCost: 0,
      };
      let normalDistance = 0;
      if (calculatingData.timeLeft > 0) {
        normalTime = calculateTime(calculatingData.timeLeft, calculatingData.price);
        withNormalPricing +=
          normalTime.daysCost + normalTime.hoursCost + normalTime.minutesCost;
      }
      if (calculatingData.distanceLeft > 0) {
        normalDistance = calculatingData.distanceLeft * 0.1;
        withNormalPricing += normalDistance;
      }
      if (withNormalPricing < cheapest.price) {
        cheapest.months = calculatingData.months;
        cheapest.weeks = calculatingData.weeks;
        cheapest.price = withNormalPricing;
        cheapest.withNormalPricing = {
          daysCost: normalTime.daysCost,
          hoursCost: normalTime.hoursCost,
          minutesCost: normalTime.minutesCost,
          distanceCost: normalDistance,
        };
      }
    }
    // We first add months and the weeks, and that's why we have onlyWeeks parameter
    if (!calculatingData.onlyWeeks) {
      cheapest = _calculateCheapestPackages({
        timeLeft: calculatingData.timeLeft - 30 * 24 * 60,
        distanceLeft: calculatingData.distanceLeft - 3000,
        months: calculatingData.months + 1,
        weeks: calculatingData.weeks,
        totalCost: calculatingData.totalCost + calculatingData.monthPrice.price,
        onlyWeeks: false,
        price: calculatingData.price,
        weekPrice: calculatingData.weekPrice,
        monthPrice: calculatingData.monthPrice,
      }, cheapest);
    }
    cheapest = _calculateCheapestPackages({
      timeLeft: calculatingData.timeLeft - 7 * 24 * 60,
      distanceLeft: calculatingData.distanceLeft - 700,
      months: calculatingData.months,
      weeks: calculatingData.weeks + 1,
      totalCost: calculatingData.totalCost + calculatingData.weekPrice.price,
      onlyWeeks: true,
      price: calculatingData.price,
      weekPrice: calculatingData.weekPrice,
      monthPrice: calculatingData.monthPrice,
    }, cheapest);
  }
  return cheapest;
}

export default calculateElmoPrice

