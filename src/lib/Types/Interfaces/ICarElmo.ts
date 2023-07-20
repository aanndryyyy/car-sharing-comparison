import type { ICar } from './ICar'
import type { ICarRentPricePackage } from './ICarRentPricePackage'

export interface ICarElmo extends ICar {
  serviceId: number
  type: string
  price: {
    km: number
    minute: number
    hour: number
    day: number
    minimum: number
  }
  packages: ICarRentPricePackage[]
  priceWithCustomerCard: {
    km: number
    hour: number
    minimum: number
  }
  city?: string
}
