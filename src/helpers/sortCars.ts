import { SortDirection } from '../lib/Types/Enums/SortDirection'
import { CarSortField } from '../lib/Types/Enums/CarSortField'
import type { Car } from '../lib/Car/GenericCar'
import type { SortingSelection } from '$lib/Store/FilterStore'
import GenericMappableCar from '$lib/Car/GenericMappableCar'
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

const sortByDistance = async (
  cars: Car[],
  userPosition: GeolocationPosition
) => {
  if (!navigator.geolocation || !userPosition) {
    alert('Not possible to get user location.')
    return
  }

  const { latitude, longitude } = userPosition.coords

  cars.sort((car1, car2) => {
    if (
      !(car1 instanceof GenericMappableCar) ||
      !(car2 instanceof GenericMappableCar)
    ) {
      return 1
    }

    if (!car1.closestMarker) {
      car1.findClosestMarkerTo(latitude, longitude)
    }

    if (!car2.closestMarker) {
      car2.findClosestMarkerTo(latitude, longitude)
    }

    return (
      haversineRaw(
        { lat: latitude, lng: longitude },
        {
          lat: car1.closestMarker?.position?.lat,
          lng: car1.closestMarker?.position?.lng,
        }
      ) -
      haversineRaw(
        { lat: latitude, lng: longitude },
        {
          lat: car2.closestMarker?.position?.lat,
          lng: car2.closestMarker?.position?.lng,
        }
      )
    )
  })
}

export default sortCars
