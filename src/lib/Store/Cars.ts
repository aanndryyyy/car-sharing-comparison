import type BeastCar from '$lib/Car/BeastCar'
import type BoltCar from '$lib/Car/BoltCar'
import type CityBeeCar from '$lib/Car/CityBeeCar'
import type ElmoCar from '$lib/Car/ElmoCar'
import { Provider } from '$lib/Types/Enums/Provider'
import { writable, derived } from 'svelte/store'
import { duration } from './DurationStore'
import { totalKilometres } from './TotalKilometresStore'
import { carsFilter } from './FilterStore'
import sortCars from '../../helpers/SortCars'
import filterCars from '../../helpers/FilterCars'
import { CarSortField } from '$lib/Types/Enums/CarSortField'
import { SortState } from '$lib/Types/Enums/SortState'

export const carsBolt = writable<BoltCar[]>([])
export const carsCityBee = writable<CityBeeCar[]>([])

//export const cars = writable<(BoltCar | CityBeeCar | ElmoCar | BeastCar)[]>([])

export const brandFilter = writable([])

export const cars = derived(
  [brandFilter, carsBolt, carsCityBee],
  ([$brandFilter, $carsBolt, $carsCityBee], set) => {
    let cars = []

    if ($brandFilter.includes(Provider.BOLT)) {
      $carsBolt.forEach((car) => car.calculateRentTotalPrice())
      cars = [...cars, ...$carsBolt]
    } else {
      $carsBolt.forEach((car) => car.setMarkersMap())
    }

    if ($brandFilter.includes(Provider.CITYBEE)) {
      $carsCityBee.forEach((car) => car.calculateRentTotalPrice())
      cars = [...cars, ...$carsCityBee]
    }

    let sortedCars = sortCars(cars, CarSortField.PRICE, SortState.UP)

    // @ts-expect-error
    set(sortedCars)
  },
  []
)

export const sortedCars = derived(
  [cars, duration, totalKilometres, carsFilter],
  ([$cars, $duration, $totalKilometres, $carsFilter], set) => {
    $cars.forEach((car) => car.calculateRentTotalPrice())

    // const filteredCars = filterCars($cars, $carsFilter)
    const sortedCars = sortCars($cars, CarSortField.PRICE, SortState.UP)

    // @ts-expect-error
    set(sortedCars)
  },
  []
)
