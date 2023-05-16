import type { Car } from '../../lib/DTO/Car'
import type { SearchParamsObj } from '../../lib/DTO/SearchParamsObj'
import type { ICarRentPrice } from '../../lib/Types/Interfaces/ICarRentPrice'

const calculateBeastPrice = (
  car: Car,
  searchParamsObj: SearchParamsObj
): number => {
  const price = car.price
  let totalMinutes = searchParamsObj.minutes + searchParamsObj.hours * 60
  // ---- Distance
  // Distance
  let freeDistance = 0
  // Weeks
  let weeksCost = 0
  if (searchParamsObj.days >= 7) {
    const weeks = Math.floor(searchParamsObj.days / 7)
    searchParamsObj.days -= weeks * 7
    weeksCost += weeks * price.week
    freeDistance += weeks * 7 * 300
  }
  // 3Days
  let threeDaysCost = 0
  if (searchParamsObj.days >= 3) {
    const threeDays = Math.floor(searchParamsObj.days / 3)
    searchParamsObj.days -= threeDays * 3
    const extraMinutes = calculateMinute(totalMinutes, price)
    if (
      threeDays * price['3days'] +
        searchParamsObj.days * price.day +
        extraMinutes.daysCost +
        extraMinutes.minutesCost >
      price.week
    ) {
      weeksCost += price.week
      searchParamsObj.days = 0
      totalMinutes = 0
      freeDistance += 7 * 300
    } else {
      threeDaysCost += threeDays * price['3days']
      freeDistance += 3 * 300
    }
  }
  // Days
  let daysCost = 0
  if (searchParamsObj.days >= 1) {
    const extraMinutes = calculateMinute(totalMinutes, price)
    if (
      searchParamsObj.days * price.day +
        extraMinutes.daysCost +
        extraMinutes.minutesCost >
      price['3days']
    ) {
      threeDaysCost += price['3days']
      freeDistance += 3 * 300
      totalMinutes = 0
    } else {
      daysCost += searchParamsObj.days * price.day
      freeDistance += searchParamsObj.days * 300
    }
  }
  const minutes = calculateMinute(totalMinutes, price)
  freeDistance += minutes.freeDistance
  daysCost += minutes.daysCost
  const minutesCost = minutes.minutesCost

  const distanceCost =
    Math.max(searchParamsObj.distance - freeDistance, 0) * price.km
  return (
    weeksCost +
    threeDaysCost +
    daysCost +
    minutesCost +
    distanceCost +
    price.start
  )

  // {
  //   price:
  //     weeksCost +
  //     threeDaysCost +
  //     daysCost +
  //     minutesCost +
  //     distanceCost +
  //     price.start,
  //   preOrder: weeksCost + threeDaysCost + daysCost > 0 ? 0 : -1,
  // };
}

const calculateMinute = (totalMinutes: number, price: ICarRentPrice) => {
  let freeDistance = 0
  let daysCost = 0
  let minutesCost = 0
  if (totalMinutes > 0) {
    freeDistance += 300
    if (totalMinutes * price.minute > price.day) {
      daysCost += price.day
    } else {
      minutesCost += totalMinutes * price.minute
    }
  }
  return { freeDistance, daysCost, minutesCost }
}

export default calculateBeastPrice
