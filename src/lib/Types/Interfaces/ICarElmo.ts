import type { ICar } from "./ICar"

export interface ICarElmo extends ICar {
  type: string
  price: {
    km: {
      base: number
      after100: number
    }
    minute: number
    hour: number
    day: number
    week: {
      price: number
      km: {
        included: number
        priceAfter: number
      }
    }
    month: {
      price: number
      km: {
        included: number
        priceAfter: number
      }
    }
    minimum: number
    start: number
  }
  priceWithCustomerCard: {
    km: number
    hour: number
    minimum: number
  }
}
