import { writable, derived, type Readable } from 'svelte/store'
import { days, duration, hours, minutes } from './DurationStore'
import { totalKilometres } from './TotalKilometresStore'
import { carsFilter, carsSort, type SortingSelection } from './FilterStore'
import sortCars from '../../helpers/sortCars'
import filterCars from '../../helpers/filterCars'
import type { Car } from '$lib/Car/GenericCar'
import { userPosition } from './GoogleMapStore'
import { SearchParamsObj } from '../DTO/SearchParamsObj'
import { CarSortField } from '../Types/Enums/CarSortField'

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
  Car[]
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
    const searchParamsObj: SearchParamsObj = new SearchParamsObj()
    searchParamsObj.distance = $totalKilometres
    searchParamsObj.days = $days
    searchParamsObj.hours = $hours
    searchParamsObj.minutes = $minutes
    $cars.forEach((car) => car.calculateRentTotalPrice({ ...searchParamsObj }))
    // Filter & Sort the cars
    const filteredCars = filterCars($cars, $carsFilter)
    const sortedCars = sortCars(filteredCars, $sortOptions, $userPosition)
    if ($sortOptions.value === CarSortField.DISTANCE) {
      sortedCars.filter((car) => {
        if (!car.closestMarker || !car.closestMarker.title) return false
        return Number(car.closestMarker.title) < 1
      })
    }
    set(sortedCars)
  },
  []
)
