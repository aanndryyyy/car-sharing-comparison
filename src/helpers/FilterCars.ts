import type { Car } from '$lib/Car/GenericCar'
import type { carsFilters } from '$lib/Store/FilterStore'
import type { Provider } from '$lib/Types/Enums/Provider'

const filterCars = (
  cars: Car[],
  filters: carsFilters
): { visible: Car[]; hidden: Car[] } => {
  let { visible, hidden } = _searchProvider(cars, filters.providers)

  return { visible, hidden }
}

const _searchProvider = (
  cars: Car[],
  providers: Provider[]
): { visible: Car[]; hidden: Car[] } => {
  if (!providers.length)
    return {
      visible: cars,
      hidden: [],
    }

  let visible: Car[] = []
  let hidden: Car[] = []

  for (const car of cars) {
    if (providers.includes(car.provider)) {
      visible.push(car)
      continue
    }

    hidden.push(car)
  }

  return { visible, hidden }
}

export default filterCars
