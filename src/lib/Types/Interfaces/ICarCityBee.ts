import type { ICar } from './ICar'

export interface ICarCityBee extends ICar {
  id: number
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
}
