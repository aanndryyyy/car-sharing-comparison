import { MotorType } from '../Enums/MotorType'

export interface ICar {
  name: string
  price: object
  city?: string
  motorType: MotorType
}
