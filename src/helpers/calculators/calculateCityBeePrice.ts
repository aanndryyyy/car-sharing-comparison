import { calculateTime, getDuration } from './calculatorHelper'
import type { CarRentPricePackage } from '../../lib/DTO/CarRentPricePackage'
import type { ICarCityBee } from '../../lib/Types/Interfaces/ICarCityBee'
import type { CarRentPrice } from '../../lib/DTO/CarRentPrice'
import type { SearchParamsObj } from '../../lib/DTO/SearchParamsObj'
import type { ICarRentPricePackage } from '../../lib/Types/Interfaces/ICarRentPricePackage'

const calculateCityBeePrice = (
  car: ICarCityBee,
  searchParamsObj: SearchParamsObj
): Object => {
  const price = (car as ICarCityBee).price as CarRentPrice

  let totalCost = _getPayAsYouGoCost(searchParamsObj, price)
  if (totalCost < price.minimum) {
    return { price: price.minimum, pricePackages: [] }
  }

  const usablePackages = []
  let usablePackage: CarRentPricePackage | null
  let remainingCost = totalCost
  do {
    usablePackage = _findPackage(car, searchParamsObj, remainingCost)
    if (usablePackage) {
      usablePackages.push(usablePackage)
      searchParamsObj.distance -= usablePackage.distance
      if (searchParamsObj.days < usablePackage.days) {
        searchParamsObj.days = 0
        searchParamsObj.hours = 0
        searchParamsObj.minutes = 0
      } else if (searchParamsObj.hours < usablePackage.hours) {
        searchParamsObj.days -= usablePackage.days
        searchParamsObj.hours = 0
        searchParamsObj.minutes = 0
      } else {
        searchParamsObj.days -= usablePackage.days
        searchParamsObj.hours -= usablePackage.hours
      }
      remainingCost = _getPayAsYouGoCost(searchParamsObj, price)
    }
  } while (usablePackage)

  const packagesSum = usablePackages.reduce((n, { price }) => n + price, 0)
  let totalCostWithPackages =
    _getPayAsYouGoCost(searchParamsObj, price) + packagesSum
  totalCostWithPackages = Number(totalCostWithPackages.toFixed(2))

  return {
    price:
      totalCostWithPackages < totalCost ? totalCostWithPackages : totalCost,
    pricePackages: totalCostWithPackages < totalCost ? usablePackages : [],
  }
}

const _getPayAsYouGoCost = (
  searchParamsObj: SearchParamsObj,
  price: CarRentPrice
): number => {
  const distanceCost = searchParamsObj.distance * price.km
  const { daysCost, hoursCost, minutesCost } = calculateTime(
    getDuration(searchParamsObj),
    price
  )
  const cost = 0.5 + distanceCost + daysCost + hoursCost + minutesCost
  return Number(cost.toFixed(2))
}

const _findPackage = (
  car: ICarCityBee,
  searchParamsObj: SearchParamsObj,
  totalCost: number
): CarRentPricePackage | null => {
  const packages: ICarRentPricePackage[] = car.packages
  const price = car.price
  const duration = getDuration(searchParamsObj)

  let usePackage: CarRentPricePackage | null = null
  for (const pricePackage of packages) {
    if (!pricePackage.price) continue
    if (pricePackage.price < totalCost) {
      const packageTotalTime =
        pricePackage.days * 24 * 60 + pricePackage.hours * 60
      // if fits exactly in the package
      if (
        searchParamsObj.distance <= pricePackage.distance &&
        duration <= packageTotalTime &&
        (!usePackage || pricePackage.price < usePackage.price)
      ) {
        usePackage = { ...pricePackage }
        usePackage.priceWithPayAsYouGo = usePackage.price
      }
      // if fits in the package with some extra time or distance
      else {
        let packageCostExtra = pricePackage.price
        // Add extra distance
        if (searchParamsObj.distance > pricePackage.distance) {
          packageCostExtra +=
            (searchParamsObj.distance - pricePackage.distance) * price.km
        }
        // Add extra time
        if (duration > packageTotalTime) {
          const extraTime = duration - packageTotalTime
          let extraCostTime = calculateTime(extraTime, price as CarRentPrice)
          packageCostExtra +=
            extraCostTime.daysCost +
            extraCostTime.hoursCost +
            extraCostTime.minutesCost
        }
        if (
          packageCostExtra < totalCost &&
          (!usePackage || packageCostExtra < usePackage.priceWithPayAsYouGo)
        ) {
          usePackage = { ...pricePackage }
          usePackage.priceWithPayAsYouGo = packageCostExtra
        }
      }
    }
  }
  return usePackage
}

export default calculateCityBeePrice
