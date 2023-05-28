import { SortDirection } from '../lib/Types/Enums/SortDirection'
import { CarSortField } from '../lib/Types/Enums/CarSortField'
import type { Car } from '../lib/Car/GenericCar'
import type { SortingSelection } from '$lib/Store/FilterStore'

const sortCars = (cars: Car[], sortingOption: SortingSelection): Car[] => {
  if (sortingOption.direction === SortDirection.NONE || cars.length === 0)
    return cars

  switch (sortingOption.value) {
    case CarSortField.PRICE:
      cars.sort((car1, car2) => car1.getTotalPrice() - car2.getTotalPrice())
      break
  }

  if (sortingOption.direction === SortDirection.ASCENDING) cars.reverse()

  return cars
}

export default sortCars
