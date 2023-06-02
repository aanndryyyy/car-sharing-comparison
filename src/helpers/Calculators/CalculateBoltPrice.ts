import { get } from 'svelte/store'
import { totalKilometres } from '../../lib/Store/TotalKilometresStore'
import {
  days as storeDays,
  hours as storeHours,
  minutes as storeMinutes,
} from '../../lib/Store/DurationStore'

import type { Car } from '../../lib/DTO/Car'
import type { ICarBolt } from "../../lib/Types/Interfaces/ICarBolt";

const calculateBoltPrice = (car: Car): number => {
  const price = (car as ICarBolt).price
  let distance = get(totalKilometres)
  let days = get(storeDays)
  let hours = get(storeHours)
  let minutes = get(storeMinutes)

  const distanceCost = distance * price.km

  // Days
  let daysCost = 0
  if (days >= 1) {
    daysCost += days * price.day
  }
  // Hours
  let hoursCost = 0
  if (hours >= 1) {
    if (hours * price.hour + minutes * price.minute > price.day) {
      daysCost += price.day
      hours = 0
      minutes = 0
    } else {
      hoursCost += hours * price.hour
    }
  }
  // Minutes
  let minutesCost = 0
  if (minutes >= 1) {
    if (minutes * price.minute > price.hour) {
      hoursCost += price.hour
    } else {
      minutesCost += minutes * price.minute
    }
  }
  let totalCost = distanceCost + daysCost + hoursCost + minutesCost
  if (totalCost < price.minimum) {
    totalCost = price.minimum
  }
  return totalCost
}

export default calculateBoltPrice
