import type { ICar } from './ICar'

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
  packages: [
    {
      days: number
      distance: number
      price: number
    }
  ]
  priceWithCustomerCard: {
    km: number
    hour: number
    minimum: number
  }
}
