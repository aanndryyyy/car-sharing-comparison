import type { Car } from '$lib/Car/GenericCar'
import type { carsFilters } from '$lib/Store/FilterStore'
import { Provider } from '$lib/Types/Enums/Provider'
import { MotorType } from '../lib/Types/Enums/MotorType'
import { City } from '../lib/Types/Enums/City'

const filterCars = (cars: Car[], filters: carsFilters): Car[] => {
  cars = _searchProvider(cars, filters.providers)
  cars = _searchMotorType(cars, filters.motorTypes)
  cars = _searchCity(cars, filters.cities)

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
  return cars.filter(
    (car) =>
      !car.carData.motorType ||
      value.some((v) => v.toLowerCase() === car.carData.motorType.toLowerCase())
  )
}

const _searchCity = (cars: Car[], value: City[]) => {
  cars.forEach((car) =>
    car.markers.forEach(
      (marker) =>
        (marker.hidden = !value.some((v) => v.toUpperCase() === marker.role))
    )
  )
  return cars
}

export default filterCars
