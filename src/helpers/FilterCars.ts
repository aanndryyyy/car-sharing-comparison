import type { Car } from '$lib/Car/GenericCar'

const filterCars = (cars: Car[], filters): Car[] => {
  cars = _searchProvider(cars, filters.provider)

  return cars
}

const _searchProvider = (cars: Car[], value) => {
  const haveSomeProvider = Object.keys(value).some(
    (provider) => value[provider]
  )
  if (!haveSomeProvider) return cars
  return cars.filter((car) => value[car.provider])
}

export default filterCars
