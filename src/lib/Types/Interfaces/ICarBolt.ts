import type { ICar } from './ICar'

export interface ICarBolt extends ICar {
  serviceId: number
  imageUrl: string
  price: {
    km: number
    minute: number
    hour: number
    day: number
    minimum: number
  }
  coordinates: {
    serviceId: number
    lat: number
    lng: number
  }[]
  city: string
}
