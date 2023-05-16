import type { ICarRentPricePackage } from './ICarRentPricePackage'
import type { ICarRentPrice } from './ICarRentPrice'

export interface IElmoPackageCalculatingData {
  timeLeft: number
  distanceLeft: number
  months: number
  weeks: number
  totalCost: number
  onlyWeeks: boolean
  price: ICarRentPrice
  weekPrice: ICarRentPricePackage
  monthPrice: ICarRentPricePackage
}
