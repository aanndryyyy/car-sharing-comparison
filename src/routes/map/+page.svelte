<script>
  import CarsMap from '$lib/Components/CarsMap/CarsMap.svelte'
</script>

<main class="flex min-h-full">
  <aside class="w-96">
    <h1>Planner</h1>
  </aside>

  <div class="grow bg-gray-300">
    <CarsMap class="h-full" />
  </div>
</main>

<style lang="postcss">
  :global(html),
  :global(body) {
    @apply h-full;
  }
</style>
