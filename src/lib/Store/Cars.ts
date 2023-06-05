import { writable, derived, type Readable } from 'svelte/store'
import { days, duration, hours, minutes } from './DurationStore'
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
    duration,
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
      $duration,
      $totalKilometres,
    ],
    set
  ) => {
    // console.log("duration", $duration)
    // Calculate the total price once for performance.
    const searchParamsObj: SearchParamsObj = new SearchParamsObj()
    searchParamsObj.distance = $totalKilometres
    searchParamsObj.days = $days
    searchParamsObj.hours = $hours
    searchParamsObj.minutes = $minutes
    // console.log("searchParamsObj", searchParamsObj)
    $cars.forEach((car) => car.calculateRentTotalPrice({ ...searchParamsObj }))
    // console.log("cars1", $cars)
    // console.log("youou")
    // Filter & Sort the cars
    const { visible, hidden } = filterCars($cars, $carsFilter)
    // console.log("cars2", visible)
    const sortedVisible = sortCars(visible, $sortOptions, $userPosition)

    set({ visible: sortedVisible, hidden: hidden })
  },
  { visible: [], hidden: [] }
)
