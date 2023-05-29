import type { ICar } from './ICar'

export interface ICarBeast extends ICar {
  serviceId: number
  price: {
    km: number
    minute: number
    hour: number
    day: number
    threeDay: number
    week: number
    start: number
    deposit: {
      base: number
      special: number
    }
  }
}
