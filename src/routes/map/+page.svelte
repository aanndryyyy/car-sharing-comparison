<script>
  import CarsMap from '$lib/Components/CarsMap/CarsMap.svelte'
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
