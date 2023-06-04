import type { ICarRentPricePackage } from '../Types/Interfaces/ICarRentPricePackage'
import { PackageName } from '../Types/Enums/PackageName'

export class CarRentPricePackage implements ICarRentPricePackage {
  name = PackageName.DAY
  days = 0
  distance = 0
  hours = 0
  price = Number.MAX_SAFE_INTEGER
  priceWithPayAsYouGo = Number.MAX_SAFE_INTEGER
}
