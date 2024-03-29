import { MotorType } from '../Enums/MotorType'

export interface ICar {
  name: string
  price: object
  city?: string
  motorType: MotorType
  coordinates: {
    serviceId: number
    carId: number
    city: string
    lat: number
    lng: number
  }[]
}
