import type { ICarRentPrice } from '../../lib/Types/Interfaces/ICarRentPrice'
import type { SearchParamsObj } from '../../lib/DTO/SearchParamsObj'
import type { ICarBeast } from '../../lib/Types/Interfaces/ICarBeast'

const calculateBeastPrice = (
  car: ICarBeast,
  searchParamsObj: SearchParamsObj
): number => {
  const price = car.price

  let totalMinutes = searchParamsObj.minutes + searchParamsObj.hours * 60
  // Weeks
  let weeksCost = 0
  if (searchParamsObj.days >= 7) {
    const weeks = Math.floor(searchParamsObj.days / 7)
    searchParamsObj.days -= weeks * 7
    weeksCost += weeks * price.week
  }
  // 3Days
  let threeDaysCost = 0
  if (searchParamsObj.days >= 3) {
    const threeDays = Math.floor(searchParamsObj.days / 3)
    searchParamsObj.days -= threeDays * 3
    const extraMinutes = calculateMinute(totalMinutes, price as ICarRentPrice)
    if (
      threeDays * price.threeDays +
        searchParamsObj.days * price.day +
        extraMinutes.daysCost +
        extraMinutes.minutesCost >
      price.week
    ) {
      weeksCost += price.week
      searchParamsObj.days = 0
      totalMinutes = 0
    } else {
      threeDaysCost += threeDays * price.threeDays
    }
  }
  // Days
  let daysCost = 0
  if (searchParamsObj.days >= 1) {
    const extraMinutes = calculateMinute(totalMinutes, price as ICarRentPrice)
    if (
      searchParamsObj.days * price.day +
        extraMinutes.daysCost +
        extraMinutes.minutesCost >
      price.threeDays
    ) {
      threeDaysCost += price.threeDays
      totalMinutes = 0
    } else {
      daysCost += searchParamsObj.days * price.day
    }
  }
  const calcMinutes = calculateMinute(totalMinutes, price as ICarRentPrice)
  daysCost += calcMinutes.daysCost
  const minutesCost = calcMinutes.minutesCost

  const packagesSum = weeksCost + threeDaysCost + daysCost
  if (packagesSum > 0) {
    return packagesSum + minutesCost + price.start
  }
  return minutesCost + price.start
}

const calculateMinute = (totalMinutes: number, price: ICarRentPrice) => {
  let daysCost = 0
  let minutesCost = 0
  if (totalMinutes > 0) {
    if (totalMinutes * price.minute > price.day) {
      daysCost += price.day
    } else {
      minutesCost += totalMinutes * price.minute
    }
  }
  return { daysCost, minutesCost }
}

export default calculateBeastPrice
