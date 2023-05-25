<script>
  import BoltCar from '$lib/Car/BoltCar'
  import CityBeeCar from '$lib/Car/CityBeeCar'
  import ElmoCar from '$lib/Car/ElmoCar'
  import BeastCar from '$lib/Car/BeastCar'
  import { Provider } from '$lib/Types/Enums/Provider'
  import { cars } from '$lib/Store/Cars'
  import CarsMap from '$lib/Components/CarsMap/CarsMap.svelte'

  /** @type {import('./$types').PageData} */
  export let data

  data.providerDetails.forEach((providers) => {
    const { provider, services } = providers

    services.forEach((carData) => {
      switch (provider.toUpperCase()) {
        case Provider.BOLT:
          $cars = [...$cars, new BoltCar(carData)]

          break

        case Provider.CITYBEE:
          $cars = [...$cars, new CityBeeCar(carData)]

          break

        case Provider.ELMO:
          $cars = [...$cars, new ElmoCar(carData)]
          break

        case Provider.BEAST:
          $cars = [...$cars, new BeastCar(carData)]
          break

        default:
          throw new Error('Data provider ' + provider + ' is not implemented!')
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
