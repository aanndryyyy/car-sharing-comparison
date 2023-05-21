import type BeastCar from '$lib/Car/BeastCar'
import type BoltCar from '$lib/Car/BoltCar'
import type CityBeeCar from '$lib/Car/CityBeeCar'
import type ElmoCar from '$lib/Car/ElmoCar'
import { writable, derived } from 'svelte/store'
import { duration } from './DurationStore'
import { totalKilometres } from './TotalKilometresStore'
import sortCars from '../../helpers/SortCars'
import { CarSortField } from '$lib/Types/Enums/CarSortField'
import { SortState } from '$lib/Types/Enums/SortState'

export const cars = writable<(BoltCar | CityBeeCar | ElmoCar | BeastCar)[]>([])

export const sortedCars = derived(
  [cars, duration, totalKilometres],
  ([$cars, $duration, $totalKilometres], set) => {
    $cars.forEach((car) => car.calculateRentTotalPrice())

    let sortedCars = sortCars($cars, CarSortField.PRICE, SortState.UP)

    // @ts-expect-error
    set(sortedCars)
  },
  []
)
