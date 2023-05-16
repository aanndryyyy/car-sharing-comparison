import type BaseCar from '../lib/Car/BaseCar'
import { SortState } from '../lib/Types/Enums/SortState'
import { CarSortField } from '../lib/Types/Enums/CarSortField'

const sortCars = (
  cars: BaseCar[],
  carSortField: CarSortField,
  sortState: SortState
): BaseCar[] => {
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
