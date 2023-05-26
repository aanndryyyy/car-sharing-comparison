import { writable, derived, type Writable, type Readable } from 'svelte/store'
import { duration } from './DurationStore'
import { totalKilometres } from './TotalKilometresStore'
import { carsFilter } from './FilterStore'
import sortCars from '../../helpers/SortCars'
import filterCars from '../../helpers/FilterCars'
import { CarSortField } from '$lib/Types/Enums/CarSortField'
import { SortState } from '$lib/Types/Enums/SortState'
import type { Car } from '$lib/Car/GenericCar'

export const cars = writable<Car[]>([])
export const brandFilter = writable([])

// Store for subscription for items that require updating if duration or distance changes.
export const pricingParams = derived(
  [duration, totalKilometres],
  ([$duration, $totalKilometres], set) => set({ $duration, $totalKilometres })
)

export const visibleCars = derived<
  [Readable<Car[]>, Readable<any>, Readable<number>, Readable<number>],
  Car[]
>(
  [cars, carsFilter, duration, totalKilometres],
  ([$cars, $carsFilter], set) => {
    // Calculate the total price once for performance.
    $cars.forEach((car) => car.calculateRentTotalPrice())

    // Filter & Sort the cars
    const filteredCars = filterCars($cars, $carsFilter)
    const visibleCars = sortCars(filteredCars, CarSortField.PRICE, SortState.UP)

    set(visibleCars)
  },
  []
)
