import { writable, derived, type Writable, type Readable } from 'svelte/store'
import { duration } from './DurationStore'
import { totalKilometres } from './TotalKilometresStore'
import { carsFilter, carsSort, type SortingSelection } from './FilterStore'
import sortCars from '../../helpers/SortCars'
import filterCars from '../../helpers/FilterCars'
import type { Car } from '$lib/Car/GenericCar'
import { userPosition } from './GoogleMapStore'

export const cars = writable<Car[]>([])

export const visibleCars = derived<
  [
    Readable<Car[]>,
    Readable<any>,
    Readable<SortingSelection>,
    Readable<GeolocationPosition>,
    Readable<number>,
    Readable<number>
  ],
  { visible: Car[]; hidden: Car[] }
>(
  [cars, carsFilter, carsSort, userPosition, duration, totalKilometres],
  ([$cars, $carsFilter, $sortOptions, $userPosition], set) => {
    // Calculate the total price once for performance.
    $cars.forEach((car) => car.calculateRentTotalPrice())

    // Filter & Sort the cars
    const { visible, hidden } = filterCars($cars, $carsFilter)
    const sortedVisible = sortCars(visible, $sortOptions, $userPosition)

    set({ visible: sortedVisible, hidden: hidden })
  },
  { visible: [], hidden: [] }
)
