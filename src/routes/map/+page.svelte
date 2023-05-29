<script lang="ts">
  import { cars } from '$lib/Store/Cars'
  import type { Car } from '$lib/Car/GenericCar'
  import CarsMap from '$lib/Components/CarsMap/CarsMap.svelte'

  /** @type {import('./$types').PageData} */
  export let data: { cars: Car[] }
  $cars = data.cars
</script>

<main
  class="grid min-h-full grid-rows-[1fr_5rem] md:grid-cols-[24rem_1fr] md:grid-rows-none"
>
  <aside class="hidden md:block md:w-96">
    <h1>Planner</h1>
  </aside>

  <div class="grow bg-gray-300">
    <CarsMap zoom={13} class="h-full w-full" />
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
