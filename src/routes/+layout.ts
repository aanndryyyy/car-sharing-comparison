import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'

import { Provider as EProvider } from '$lib/Types/Enums/Provider'
import type { Provider } from '$lib/types'

import BoltCar from '$lib/Car/BoltCar'
import CityBeeCar from '$lib/Car/CityBeeCar'
import ElmoCar from '$lib/Car/ElmoCar'
import BeastCar from '$lib/Car/BeastCar'
import type { Car } from '$lib/Car/GenericCar'
import type { ICarBolt } from '$lib/Types/Interfaces/ICarBolt'
import type { ICarCityBee } from '$lib/Types/Interfaces/ICarCityBee'
import type { ICarElmo } from '$lib/Types/Interfaces/ICarElmo'
import type { ICarBeast } from '$lib/Types/Interfaces/ICarBeast'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(PUBLIC_BACKEND_BASE_URL + 'location')
  const providerDetails = (await response.json()) as Provider[]

  let cars: Car[] = []
  providerDetails.forEach((providers) => {
    const { provider, services } = providers
    const theProvider = provider.toUpperCase() as EProvider

    services.forEach((carData) => {
      let car: Car

      switch (theProvider) {
        case EProvider.BOLT:
          car = new BoltCar(EProvider.BOLT, carData as ICarBolt)
          break

        case EProvider.CITYBEE:
          car = new CityBeeCar(EProvider.CITYBEE, carData as ICarCityBee)
          break

        case EProvider.ELMO:
          car = new ElmoCar(EProvider.ELMO, carData as ICarElmo)
          break

        case EProvider.BEAST:
          car = new BeastCar(EProvider.BEAST, carData as ICarBeast)
          break

        default:
          throw new Error(theProvider + ' is not configured.')
      }

      cars.push(car)
    })
  })

  return {
    cars,
  }
}
