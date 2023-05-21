import { CarBodyType } from '../Types/Enums/CarBodyType'
import { MotorType } from '../Types/Enums/MotorType'
import { GearboxType } from '../Types/Enums/GearboxType'
import type { ICar } from '../Types/Interfaces/ICar'
import { CarRentPrice } from './CarRentPrice'

export class Car implements ICar {
  name = ''
  price = {}
}
