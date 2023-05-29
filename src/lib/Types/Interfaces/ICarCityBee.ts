import type { ICar } from './ICar'

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
  }
  package: {
    km: number
    minute: number
    hour: number
    day: number
    base: number
  }
  category: string
  gearbox: string
  coordinates: { serviceId: number; carId: number; lat: number; lng: number }[]
}
