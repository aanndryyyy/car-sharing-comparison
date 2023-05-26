import type { CarData } from './Car/GenericCar'

export interface Provider {
  provider: string
  services: CarData[]
}
