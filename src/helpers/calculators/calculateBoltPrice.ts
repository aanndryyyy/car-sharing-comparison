import type { ICarBolt }  from '../../lib/Types/Interfaces/ICarBolt'
import type { SearchParamsObj } from '../../lib/DTO/SearchParamsObj'

const calculateBoltPrice = (
  car: ICarBolt,
  searchParamsObj: SearchParamsObj
): number => {
  const price = car.price
  const distanceCost = searchParamsObj.distance * price.km

  // Days
  let daysCost = 0
  if (searchParamsObj.days >= 1) {
    daysCost += searchParamsObj.days * price.day
  }
  // Hours
  let hoursCost = 0
  if (searchParamsObj.hours >= 1) {
    if (
      searchParamsObj.hours * price.hour +
        searchParamsObj.minutes * price.minute >
      price.day
    ) {
      daysCost += price.day
      searchParamsObj.hours = 0
      searchParamsObj.minutes = 0
    } else {
      hoursCost += searchParamsObj.hours * price.hour
    }
  }
  // Minutes
  let minutesCost = 0
  if (searchParamsObj.minutes >= 1) {
    if (searchParamsObj.minutes * price.minute > price.hour) {
      hoursCost += price.hour
    } else {
      minutesCost += searchParamsObj.minutes * price.minute
    }
  }
  let totalCost = distanceCost + daysCost + hoursCost + minutesCost
  if (totalCost < price.minimum) {
    totalCost = price.minimum
  }
  return totalCost
}

export default calculateBoltPrice
