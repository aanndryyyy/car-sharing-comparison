import type BoltCar from '$lib/Car/BoltCar'
import type CityBeeCar from '$lib/Car/CityBeeCar'
import type ElmoCar from '$lib/Car/ElmoCar'
import type BeastCar from '$lib/Car/BeastCar'

const filterCars = (
  cars: (BoltCar | CityBeeCar | ElmoCar | BeastCar)[],
  filters
): (BoltCar | CityBeeCar | ElmoCar | BeastCar)[] => {
  cars = _searchProvider(cars, filters.provider)

  return cars
}

const _searchProvider = (cars, value) => {
  const haveSomeProvider = Object.keys(value).some(
    (provider) => value[provider]
  )
  if (!haveSomeProvider) return cars
  return cars.filter((car) => value[car.getProvider()])
}

export default filterCars
