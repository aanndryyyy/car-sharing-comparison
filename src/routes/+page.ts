import BoltCar from '$lib/Car/BoltCar'
import CityBeeCar from '$lib/Car/CityBeeCar'
import ElmoCar from '$lib/Car/ElmoCar'
import BeastCar from '$lib/Car/BeastCar'
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
import { Provider } from '$lib/Types/Enums/Provider.js'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(PUBLIC_BACKEND_BASE_URL + 'detail')
  const details = await response.json() as {provider: string, services: [] }[]

  let boltCars: BoltCar[] = []
  let cityBeeCars: CityBeeCar[] = []
  let elmoCars: ElmoCar[] = []
  let beastCars: BeastCar[] = []

  details.forEach( ({provider, services}) => {

    services.forEach( data => {

      switch (provider.toUpperCase()) {
        case Provider.BOLT:
          boltCars.push(new BoltCar(data))
          break;
      
        case Provider.CITYBEE:
          cityBeeCars.push(new CityBeeCar(data))
          break;
      
        case Provider.ELMO:
          elmoCars.push(new ElmoCar(data))
          break;
      
        case Provider.BEAST:
          beastCars.push(new BeastCar(data))
          break;
      
        default:
          throw new Error( 'Data provider ' + provider + ' is not implemented!');
      }
    })
  });

  return {
    boltCars,
    cityBeeCars,
    elmoCars,
    beastCars,
  }
}
