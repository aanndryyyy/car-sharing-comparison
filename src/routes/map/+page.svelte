<script>
  import BoltCar from '$lib/Car/BoltCar'
  import CityBeeCar from '$lib/Car/CityBeeCar'
  import ElmoCar from '$lib/Car/ElmoCar'
  import BeastCar from '$lib/Car/BeastCar'
  import { Provider } from '$lib/Types/Enums/Provider'
  import { carsBolt, carsCityBee } from '$lib/Store/Cars'
  import CarsMap from '$lib/Components/CarsMap/CarsMap.svelte'

  /** @type {import('./$types').PageData} */
  export let data

  data.providerDetails.forEach((providers) => {
    const { provider, services } = providers

    services.forEach((carData) => {
      switch (provider.toUpperCase()) {
        case Provider.BOLT:
          $carsBolt = $carsBolt
            ? [...$carsBolt, new BoltCar(carData)]
            : [new BoltCar(carData)]

          break

        case Provider.CITYBEE:
          $carsCityBee = $carsCityBee
            ? [...$carsCityBee, new CityBeeCar(carData)]
            : [new CityBeeCar(carData)]

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
  })
</script>

<main
  class="grid min-h-full grid-rows-[1fr_5rem] md:grid-cols-[24rem_1fr] md:grid-rows-none"
>
  <aside class="hidden md:block md:w-96">
    <h1>Planner</h1>
  </aside>

  <div class="grow bg-gray-300">
    <CarsMap class="h-full w-full" />
  </div>

  <aside class="block h-20 md:hidden">
    <p>Filters</p>
  </aside>
</main>

<style lang="postcss">
  :global(html),
  :global(body) {
    @apply h-full;
  }
</style>
