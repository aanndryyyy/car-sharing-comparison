<script lang="ts">
  import { cars } from '$lib/Store/Cars'
  import CarsMap from '$lib/Components/CarsMap/CarsMap.svelte'
  import GenericCar from '$lib/Car/GenericCar'

  import type { Provider as EProvider } from '$lib/Types/Enums/Provider'
  import type { Provider } from '$lib/types'

  /** @type {import('./$types').PageData} */
  export let data: { providerDetails: Provider[] }

  data.providerDetails.forEach((providers) => {
    const { provider, services } = providers

    services.forEach((carData) => {
      $cars = [
        ...$cars,
        new GenericCar(provider.toUpperCase() as EProvider, carData),
      ]
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
