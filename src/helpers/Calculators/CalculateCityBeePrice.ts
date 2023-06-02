import { calculateTime } from './CalculatorHelper'
import { CarRentPricePackage } from '../../lib/DTO/CarRentPricePackage'
import type { ICarCityBee } from '../../lib/Types/Interfaces/ICarCityBee'
import { CarRentPrice } from '../../lib/DTO/CarRentPrice'
import type { ICarCityBeePricePackage } from '../../lib/Types/Interfaces/ICityBeePricePackage'
import type { SearchParamsObj } from '../../lib/DTO/SearchParamsObj'

const calculateCityBeePrice = (
  car: ICarCityBee,
  searchParamsObj: SearchParamsObj
): number => {
  const price = (car as ICarCityBee).price
  const distanceCost = searchParamsObj.distance * price.km
  const totalTime = searchParamsObj.getDuration()

  // Time
  const { daysCost, hoursCost, minutesCost } = calculateTime(
    totalTime,
    price as CarRentPrice
  )
  const totalCost = 0.5 + distanceCost + daysCost + hoursCost + minutesCost
  if (totalCost < price.minimum) {
    return price.minimum
  }
  // Calculate packages
  const usePackage: CarRentPricePackage = _calculatePackages(
    car,
    searchParamsObj,
    totalCost,
    totalTime
  )
  return usePackage.price < totalCost ? usePackage.price : totalCost
}

const _calculatePackages = (
  car: ICarCityBee,
  searchParamsObj: SearchParamsObj,
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
        searchParamsObj.distance <= option.km &&
        totalTime <= packageTotalTime &&
        option.price < usePackage.price
      ) {
        usePackage = { ...option }
      }
      // if fits in the package with some extra time or distance
      else {
        let packageCostExtra = option.price
        // Add extra distance
        if (searchParamsObj.distance > option.km) {
          packageCostExtra += (searchParamsObj.distance - option.km) * price.km
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
