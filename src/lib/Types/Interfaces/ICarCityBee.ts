import type { ICar } from './ICar'
import { ICarCityBeePricePackage } from './ICityBeePricePackage'

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
  packages: ICarCityBeePricePackage[]
  category: string
  gearbox: string
  coordinates: { serviceId: number; carId: number; lat: number; lng: number }[]
}
