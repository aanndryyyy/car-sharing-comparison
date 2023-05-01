
import { calculateTime } from "./CalculatorHelper";
import type {Car} from "../../lib/DTO/Car";
import type {SearchParamsObj} from "../../lib/DTO/SearchParamsObj";
import type {ICarRentPricePackage} from "../../lib/Types/Interfaces/ICarRentPricePackage";
import {CarRentPricePackage} from "../../lib/DTO/CarRentPricePackage";

const calculateCityBeePrice = (car: Car, searchParamsObj: SearchParamsObj): number => {
  const price = car.price;
  const distanceCost = searchParamsObj.distance * price.km;
  const totalTime =
    searchParamsObj.days * 24 * 60 +
    searchParamsObj.hours * 60 +
    searchParamsObj.minutes;
  // Time
  let { daysCost, hoursCost, minutesCost } = calculateTime(totalTime, price);
  const totalCost = 0.5 + distanceCost + daysCost + hoursCost + minutesCost;
  if (totalCost < (price.min ?? 2.29)) {
    return price.min ?? 2.29;
    // { price: 2.29, preOrder: -1 };
  }
  // Calculate packages
  const usePackage: CarRentPricePackage = _calculatePackages(
    car,
    searchParamsObj,
    totalCost,
    totalTime
  );
  return usePackage.price < totalCost ? usePackage.price : totalCost
  // {
  //   package: usePackage,
  //   price: usePackage.price < totalCost ? usePackage.price : totalCost,
  //   preOrder: usePackage.hours ? 5 : usePackage.price < totalCost ? 0 : -1,
  // };
}

const _calculatePackages = (car: Car, searchParamsObj: SearchParamsObj, totalCost: number, totalTime: number): CarRentPricePackage => {
  const packages: ICarRentPricePackage[] = car.packages;
  const price = car.price;
  let usePackage = new CarRentPricePackage();
  for (const option of packages) {
    const packageTotalTime = option.days * 24 * 60 + option.hours * 60;
    if (option.price < totalCost) {
      // if fits exactly in the package
      if (
        searchParamsObj.distance <= option.distance &&
        totalTime <= packageTotalTime &&
        option.price < usePackage.price
      ) {
        usePackage = { ...option };
      }

      // if fits in the package with some extra time or distance
      else {
        let packageCostExtra = option.price;
        // Add extra distance
        if (searchParamsObj.distance > option.distance) {
          packageCostExtra +=
            (searchParamsObj.distance - option.distance) * price.km;
        }
        // Add extra time
        if (totalTime > packageTotalTime) {
          let extraTime = totalTime - packageTotalTime;
          let extraCostTime = calculateTime(extraTime, price);
          packageCostExtra +=
            extraCostTime.daysCost +
            extraCostTime.hoursCost +
            extraCostTime.minutesCost;
        }
        if (
          packageCostExtra < totalCost &&
          packageCostExtra < usePackage.price
        ) {
          usePackage = { ...option };
          usePackage.price = packageCostExtra;
        }
      }
    }
  }
  return usePackage;
}

export default calculateCityBeePrice
