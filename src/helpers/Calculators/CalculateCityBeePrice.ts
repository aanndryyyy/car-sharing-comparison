import { calculateTime } from './CalculatorHelper'
import { CarRentPricePackage } from '../../lib/DTO/CarRentPricePackage'
import {get} from "svelte/store";
import {totalKilometres} from "../../lib/Store/TotalKilometresStore";
import {days as storeDays, hours as storeHours, minutes as storeMinutes, duration as storeDuration} from "../../lib/Store/DurationStore";
import type {ICarCityBee} from "../../lib/Types/Interfaces/ICarCityBee";
import {CarRentPrice} from "../../lib/DTO/CarRentPrice";
import type {ICarCityBeePricePackage} from "../../lib/Types/Interfaces/ICityBeePricePackage";

const calculateCityBeePrice = (
  car: ICarCityBee,
): number => {
  const price = (car as ICarCityBee).price
  let distance = get(totalKilometres)
  let days = get(storeDays)
  let hours = get(storeHours)
  let minutes = get(storeMinutes)
  const distanceCost = distance * price.km
  const totalTime = get(storeDuration)

  // Time
  const { daysCost, hoursCost, minutesCost } = calculateTime(totalTime, price as CarRentPrice)
  const totalCost = 0.5 + distanceCost + daysCost + hoursCost + minutesCost
  if (totalCost < price.minimum) {
    return price.minimum
  }
  // Calculate packages
  const usePackage: CarRentPricePackage = _calculatePackages(
    car,
    distance,
    days,
    hours,
    minutes,
    totalCost,
    totalTime
  )
  return usePackage.price < totalCost ? usePackage.price : totalCost
  // {
  //   package: usePackage,
  //   price: usePackage.price < totalCost ? usePackage.price : totalCost,
  //   preOrder: usePackage.hours ? 5 : usePackage.price < totalCost ? 0 : -1,
  // };
}

const _calculatePackages = (
  car: ICarCityBee,
  distance: number,
  days: number,
  hours: number,
  minutes: number,
  totalCost: number,
  totalTime: number
): CarRentPricePackage => {
  const packages: ICarCityBeePricePackage[] = car.packages
  const price = car.price
  let usePackage = new CarRentPricePackage()
  for (const option of packages) {
    if (option.price < totalCost) {
      const packageTotalTime = option.day * 24 * 60 + option.hour * 60
      // if fits exactly in the package
      if (
        distance <= option.km &&
        totalTime <= packageTotalTime &&
        option.price < usePackage.price
      ) {
        usePackage = { ...option }
      }
      // if fits in the package with some extra time or distance
      else {
        let packageCostExtra = option.price
        // Add extra distance
        if (distance > option.km) {
          packageCostExtra +=
            (distance - option.km) * price.km
        }
        // Add extra time
        if (totalTime > packageTotalTime) {
          const extraTime = totalTime - packageTotalTime
          let extraCostTime = calculateTime(extraTime, price as CarRentPrice)
          packageCostExtra +=
            extraCostTime.daysCost +
            extraCostTime.hoursCost +
            extraCostTime.minutesCost
        }
        if (
          packageCostExtra < totalCost &&
          packageCostExtra < usePackage.price
        ) {
          usePackage = { ...option }
          usePackage.price = packageCostExtra
        }
      }
    }
  }
  return usePackage
}

export default calculateCityBeePrice
