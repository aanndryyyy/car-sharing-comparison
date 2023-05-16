import type { CarBodyType } from '../Enums/CarBodyType'
import type { MotorType } from '../Enums/MotorType'
import type { GearboxType } from '../Enums/GearboxType'
import type { ICarRentPrice } from './ICarRentPrice'
import type { ICarRentPricePackage } from './ICarRentPricePackage'

export interface ICar {
  name: string
  bodyType: CarBodyType
  motorType: MotorType
  gearbox: GearboxType
  petFriendly: boolean
  imageUrl: string
  price: ICarRentPrice
  packages: ICarRentPricePackage[]
}
