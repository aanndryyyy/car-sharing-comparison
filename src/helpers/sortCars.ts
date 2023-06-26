import { SortDirection } from '../lib/Types/Enums/SortDirection'
import { CarSortField } from '../lib/Types/Enums/CarSortField'
import type { Car } from '../lib/Car/GenericCar'
import type { SortingSelection } from '$lib/Store/FilterStore'
import { haversineRaw } from './haversine'

const sortCars = (
  cars: Car[],
  sortingOption: SortingSelection,
  userPosition: GeolocationPosition
): Car[] => {
  if (sortingOption.direction === SortDirection.NONE || cars.length === 0)
    return cars

  switch (sortingOption.value) {
    case CarSortField.PRICE:
      cars.sort((car1, car2) => car1.getTotalPrice() - car2.getTotalPrice())
      break

    case CarSortField.DISTANCE:
      sortByDistance(cars, userPosition)
      break
  }

  if (sortingOption.direction === SortDirection.DESCENDING) cars.reverse()

  return cars
}

const sortByDistance = (
  cars: Car[],
  userPosition: GeolocationPosition
): void => {
  if (!navigator.geolocation || !userPosition) {
    alert('Not possible to get user location.')
    return
  }

  const { latitude, longitude } = userPosition.coords

  cars.forEach((car) => car.findClosestMarkerTo(latitude, longitude))
  cars.sort((car1, car2) => {
    if (!car1.closestMarker) return 1
    if (!car2.closestMarker) return -1
    return (
      haversineRaw(
        { lat: latitude, lng: longitude },
        car1.closestMarker!.position!
      ) -
      haversineRaw(
        { lat: latitude, lng: longitude },
        car2.closestMarker!.position!
      )
    )
  })
}

export default sortCars
