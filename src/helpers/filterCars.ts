import type { Car } from '$lib/Car/GenericCar'
import type { carsFilters } from '$lib/Store/FilterStore'
import { Provider } from '$lib/Types/Enums/Provider'
import { MotorType } from '../lib/Types/Enums/MotorType'

const filterCars = (cars: Car[], filters: carsFilters): Car[] => {
  cars = _searchProvider(
    cars,
    filters.providers.map((p) => p.value)
  )
  cars = _searchMotorType(
    cars,
    filters.motorTypes.map((p) => p.value)
  )
  // ..car body type
  // ...

  return cars
}

const _searchProvider = (cars: Car[], value: Provider[]) => {
  const haveSomeProvider = Object.keys(value).some((provider) => provider)
  if (!haveSomeProvider) return cars
  return cars.filter((car) => value.some((v) => v === car.provider))
}

const _searchMotorType = (cars: Car[], value: MotorType[]) => {
  const haveSomeProvider = Object.keys(value).some((motorType) => motorType)
  if (!haveSomeProvider) return cars
  return cars.filter((car) => value.some((v) => v === car.carData.motorType))
}

export default filterCars
