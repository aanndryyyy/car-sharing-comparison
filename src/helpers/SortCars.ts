import type BaseCar from '../lib/Car/BaseCar'
import { SortState } from '../lib/Types/Enums/SortState'
import { CarSortField } from '../lib/Types/Enums/CarSortField'
import type BoltCar from '$lib/Car/BoltCar'
import type CityBeeCar from '$lib/Car/CityBeeCar'
import type ElmoCar from '$lib/Car/ElmoCar'
import type BeastCar from '$lib/Car/BeastCar'

const sortCars = (
  cars: (BoltCar | CityBeeCar | ElmoCar | BeastCar)[],
  carSortField: CarSortField,
  sortState: SortState
): (BoltCar | CityBeeCar | ElmoCar | BeastCar)[] => {
  if (sortState === SortState.NONE || cars.length === 0) return cars

  switch (carSortField) {
    case CarSortField.PRICE:
      cars.sort((car1, car2) => car1.getTotalPrice() - car2.getTotalPrice())
      break
  }

  if (sortState === SortState.DOWN) cars.reverse()

  return cars
}

export default sortCars
