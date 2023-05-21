import { get } from 'svelte/store'
import { totalKilometres } from '$lib/Store/TotalKilometresStore'
import {
  days as storeDays,
  hours as storeHours,
  minutes as storeMinutes,
} from '$lib/Store/DurationStore'
import type { Car } from '../../lib/DTO/Car'
import type { ICarRentPrice } from '../../lib/Types/Interfaces/ICarRentPrice'

const calculateBeastPrice = (car: Car): number => {
  const price = car.price
  let distance = get(totalKilometres)
  let days = get(storeDays)
  let hours = get(storeHours)
  let minutes = get(storeMinutes)

  let totalMinutes = minutes + hours * 60
  // ---- Distance
  // Distance
  let freeDistance = 0
  // Weeks
  let weeksCost = 0
  if (days >= 7) {
    const weeks = Math.floor(days / 7)
    days -= weeks * 7
    weeksCost += weeks * price.week
    freeDistance += weeks * 7 * 300
  }
  // 3Days
  let threeDaysCost = 0
  if (days >= 3) {
    const threeDays = Math.floor(days / 3)
    days -= threeDays * 3
    const extraMinutes = calculateMinute(totalMinutes, price)
    if (
      threeDays * price['3days'] +
        days * price.day +
        extraMinutes.daysCost +
        extraMinutes.minutesCost >
      price.week
    ) {
      weeksCost += price.week
      days = 0
      totalMinutes = 0
      freeDistance += 7 * 300
    } else {
      threeDaysCost += threeDays * price['3days']
      freeDistance += 3 * 300
    }
  }
  // Days
  let daysCost = 0
  if (days >= 1) {
    const extraMinutes = calculateMinute(totalMinutes, price)
    if (
      days * price.day + extraMinutes.daysCost + extraMinutes.minutesCost >
      price['3days']
    ) {
      threeDaysCost += price['3days']
      freeDistance += 3 * 300
      totalMinutes = 0
    } else {
      daysCost += days * price.day
      freeDistance += days * 300
    }
  }
  const calcMinutes = calculateMinute(totalMinutes, price)
  freeDistance += calcMinutes.freeDistance
  daysCost += calcMinutes.daysCost
  const minutesCost = calcMinutes.minutesCost

  const distanceCost = Math.max(distance - freeDistance, 0) * price.km
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
