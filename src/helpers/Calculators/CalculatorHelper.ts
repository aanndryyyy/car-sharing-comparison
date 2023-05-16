import type { CarRentPrice } from '../../lib/DTO/CarRentPrice'

export const calculateTime = (totalTime: number, price: CarRentPrice) => {
  let days = Math.floor(totalTime / 1440)
  totalTime -= days * 1440
  let hours = Math.floor(totalTime / 60)
  totalTime -= hours * 60
  let minutes = totalTime
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
  return { daysCost, hoursCost, minutesCost }
}
