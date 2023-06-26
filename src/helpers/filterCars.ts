import type { Car } from '$lib/Car/GenericCar'
import type { carsFilters } from '$lib/Store/FilterStore'
import { Provider } from '$lib/Types/Enums/Provider'

const filterCars = (cars: Car[], filters: carsFilters): Car[] => {
  cars = _searchProvider(cars, filters.providers)
  // ..car fuel type
  // ..car body type
  // ...

  return cars
}

const _searchProvider = (cars: Car[], value: Provider[]) => {
  const haveSomeProvider = Object.keys(value).some((provider) => provider)
  if (!haveSomeProvider) return cars
  return cars.filter((car) => value.some((v) => v === car.provider))
}

export default filterCars
