import { Provider as EProvider } from '$lib/Types/Enums/Provider'
import { browser } from '$app/environment'
import { locale, waitLocale } from 'svelte-i18n'

import BoltCar from '$lib/Car/BoltCar'
import CityBeeCar from '$lib/Car/CityBeeCar'
import ElmoCar from '$lib/Car/ElmoCar'
import BeastCar from '$lib/Car/BeastCar'
import type { Car } from '$lib/Car/GenericCar'
import type { ICarBolt } from '$lib/Types/Interfaces/ICarBolt'
import type { ICarCityBee } from '$lib/Types/Interfaces/ICarCityBee'
import type { ICarElmo } from '$lib/Types/Interfaces/ICarElmo'
import type { ICarBeast } from '$lib/Types/Interfaces/ICarBeast'

export async function load({ data }) {
  if (browser && ['en-US', 'et'].includes(window.navigator.language)) {
    locale.set(window.navigator.language)
  }

  const { allProviders } = data

  let cars: Car[] = []

  allProviders.forEach((providers) => {
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

  await waitLocale()
  return { cars }
}
