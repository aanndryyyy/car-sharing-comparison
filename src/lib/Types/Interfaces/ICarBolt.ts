import type { ICar } from "./ICar"

export interface ICarBolt extends ICar {
  serviceId: number
  price: {
    km: number
    minute: number
    hour: number
    day: number
    minimum: number
  }
}
