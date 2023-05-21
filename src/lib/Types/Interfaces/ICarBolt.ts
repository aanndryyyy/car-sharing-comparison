import type { ICar } from "./ICar"

export interface ICarBolt extends ICar {
  serviceId: number
  icon: string
  price: {
    km: number
    minute: number
    hour: number
    day: number
    minimum: number
  }
}
