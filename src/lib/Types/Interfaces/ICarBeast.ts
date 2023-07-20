import type { ICar } from './ICar'

export interface ICarBeast extends ICar {
  serviceId: number
  price: {
    km: number
    minute: number
    hour: number
    day: number
    '3days': number
    week: number
    start: number
    minimum: number
    deposit: {
      base: number
      special: number
    }
  }
  city?: string
}
