import type { ICar } from './ICar'
import { ICarCityBeePricePackage } from './ICityBeePricePackage'
import { ICarRentPricePackage } from './ICarRentPricePackage'

export interface ICarCityBee extends ICar {
  serviceId: number
  imageUrl: string
  price: {
    km: number
    minute: number
    hour: number
    day: number
    week: number
    month: number
    minimum: number
  }
  packages: ICarRentPricePackage[]
  category: string
  gearbox: string
}
