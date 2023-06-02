import { writable, derived, type Readable } from 'svelte/store'
import { days, hours, minutes } from './DurationStore'
import { totalKilometres } from './TotalKilometresStore'
import { carsFilter, carsSort, type SortingSelection } from './FilterStore'
import sortCars from '../../helpers/SortCars'
import filterCars from '../../helpers/FilterCars'
import type { Car } from '$lib/Car/GenericCar'
import { userPosition } from './GoogleMapStore'
import { SearchParamsObj } from '../DTO/SearchParamsObj'

export const cars = writable<Car[]>([])

export const visibleCars = derived<
  [
    Readable<Car[]>,
    Readable<any>,
    Readable<SortingSelection>,
    Readable<GeolocationPosition>,
    Readable<number>,
    Readable<number>,
    Readable<number>,
    Readable<number>
  ],
  { visible: Car[]; hidden: Car[] }
>(
  [
    cars,
    carsFilter,
    carsSort,
    userPosition,
    days,
    hours,
    minutes,
    totalKilometres,
  ],
  (
    [
      $cars,
      $carsFilter,
      $sortOptions,
      $userPosition,
      $days,
      $hours,
      $minutes,
      $totalKilometres,
    ],
    set
  ) => {
    // Calculate the total price once for performance.
    const searchParamsObj: SearchParamsObj = new SearchParamsObj()
    searchParamsObj.distance = $totalKilometres
    searchParamsObj.days = $days
    searchParamsObj.hours = $hours
    searchParamsObj.minutes = $minutes
    $cars.forEach((car) => car.calculateRentTotalPrice(searchParamsObj))

    // Filter & Sort the cars
    const { visible, hidden } = filterCars($cars, $carsFilter)
    const sortedVisible = sortCars(visible, $sortOptions, $userPosition)

    set({ visible: sortedVisible, hidden: hidden })
  },
  { visible: [], hidden: [] }
)
