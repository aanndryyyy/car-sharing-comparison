import BoltCar from '$lib/Car/BoltCar'
import CityBeeCar from '$lib/Car/CityBeeCar'
import ElmoCar from '$lib/Car/ElmoCar'
import BeastCar from '$lib/Car/BeastCar'
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
import { Provider } from '$lib/Types/Enums/Provider.js'
import { cars } from '$lib/Store/Cars.js'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(PUBLIC_BACKEND_BASE_URL + 'detail')
  const details = (await response.json()) as {
    provider: string
    services: []
  }[]

  let rawCars: (BoltCar | CityBeeCar | ElmoCar | BeastCar)[] = []

  details.forEach(({ provider, services }) => {
    services.forEach((data) => {
      switch (provider.toUpperCase()) {
        case Provider.BOLT:
          rawCars.push(new BoltCar(data))
          break

        case Provider.CITYBEE:
          rawCars.push(new CityBeeCar(data))
          break

        case Provider.ELMO:
          rawCars.push(new ElmoCar(data))
          break

        case Provider.BEAST:
          rawCars.push(new BeastCar(data))
          break

        default:
          throw new Error('Data provider ' + provider + ' is not implemented!')
      }
    })
  })

  cars.set(rawCars)
}
