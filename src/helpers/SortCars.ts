import { SortDirection } from '../lib/Types/Enums/SortDirection'
import { CarSortField } from '../lib/Types/Enums/CarSortField'
import type { Car } from '../lib/Car/GenericCar'
import type { SortingSelection } from '$lib/Store/FilterStore'

const sortCars = (cars: Car[], sortingOption: SortingSelection): Car[] => {
  if (sortingOption.direction === SortDirection.NONE || cars.length === 0)
    return cars

  switch (sortingOption.value) {
    case CarSortField.PRICE:
      cars.sort((car1, car2) => car1.getTotalPrice() - car2.getTotalPrice())
      break
    case CarSortField.DISTANCE:
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords

            cars.sort((car1, car2) => {
              // Find closest car on map to user pos.
              // Cache closest marker for each car?
              // Pick closest location on map and display on carCard.
              return car1.getTotalPrice() - car2.getTotalPrice()
            })
          },
          (err) => {
            alert('Not possible to get user location.')
          }
        )
      } else {
        alert('Not possible to get user location.')
      }
      break
  }

  if (sortingOption.direction === SortDirection.DESCENDING) cars.reverse()

  return cars
}

export default sortCars
