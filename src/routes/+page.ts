import { get } from 'svelte/store'
import BoltCar from '$lib/Car/BoltCar'
import CityBeeCar from '$lib/Car/CityBeeCar'
import ElmoCar from '$lib/Car/ElmoCar'
import BeastCar from '$lib/Car/BeastCar'
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
import { Provider } from '$lib/Types/Enums/Provider.js'
import { carsBolt, carsCityBee } from '$lib/Store/Cars.js'

// Iga auto oma provider store
// => Kõik autod koos derived store

interface apiLocationResponse {
  provider: string
  services: {
    name: string
    price: {}
    coordinates: {
      lat: number
      lng: number
    }[]
  }[]
}

function serviceProviderSetup({ provider, services }: apiLocationResponse) {
  let rawCars: (BoltCar | CityBeeCar | ElmoCar | BeastCar)[] = []

  services.forEach((data) => {
    switch (provider.toUpperCase()) {
      case Provider.BOLT:
        let boltCars = get(carsBolt)
        carsBolt.set(
          boltCars ? [...boltCars, new BoltCar(data)] : [new BoltCar(data)]
        )

        break

      case Provider.CITYBEE:
        let cityBeeCars = get(carsCityBee)
        carsCityBee.set(
          cityBeeCars
            ? [...cityBeeCars, new CityBeeCar(data)]
            : [new CityBeeCar(data)]
        )
        break

      // case Provider.ELMO:
      //   rawCars.push(new ElmoCar(data))
      //   break

      // case Provider.BEAST:
      //   rawCars.push(new BeastCar(data))
      //   break

      // default:
      //   throw new Error('Data provider ' + provider + ' is not implemented!')
    }
  })

  //cars.set(rawCars)
}

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(PUBLIC_BACKEND_BASE_URL + 'location')
  const details = (await response.json()) as apiLocationResponse[]

  details.forEach(serviceProviderSetup)
}
