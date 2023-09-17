<script lang="ts">
  import { _ } from 'svelte-i18n'
  import CarsMap from '$lib/Components/CarsMap/CarsMap.svelte'
  import ManualPlanner from '$lib/Components/Planners/ManualPlanner.svelte'
  import AutoPlanner from '$lib/Components/Planners/TripPlanner.svelte'
  import CarList from '$lib/Components/Section/CarList/CarList.svelte'
  import BottomSheet from '$lib/Components/BottomSheet.svelte'
  import { ArrowsUpDown, Funnel, Icon } from 'svelte-hero-icons'
  import { cars } from '../../lib/Store/Cars'
  import Filters from '$lib/Components/Filters.svelte'
  import SortSelection from '$lib/Components/Section/CarListControlsMobile/SortSelection.svelte'
  import BrandSelection from '$lib/Components/Section/CarListControlsMobile/BrandSelection.svelte'
  import CitySelection from '$lib/Components/Section/CarListControlsMobile/CitySelection.svelte'
  import { slide } from 'svelte/transition'

  let autoPlanner: boolean = true
  let open: boolean = false
  let isfilterOpen: boolean = false
</script>

<main
  class="grid min-h-[calc(100vh-52px)] grid-rows-[1fr_5rem] md:min-h-fit md:grid-cols-[24rem_1fr] md:grid-rows-none"
>
  <aside
    class="-mt-16 hidden h-screen overflow-scroll pt-16 scrollbar-hide md:block md:w-96"
  >
    <div class="m-4 flex items-center justify-between">
      <h2 class="font-semibold">Planner</h2>

      <button
        class="flex items-center justify-center rounded bg-green-600 p-2.5 text-white"
        on:click={() => (autoPlanner = !autoPlanner)}
      >
        <Icon src={ArrowsUpDown} size="24" />
      </button>
    </div>

    <div class="px-4">
      <div class:hidden={autoPlanner}>
        <ManualPlanner />
      </div>
      <div class:hidden={!autoPlanner}>
        <AutoPlanner />
      </div>
    </div>
    <div class="m-4 mt-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-semibold">
            {$_('cars.title')}
          </h2>
        </div>

        <button
          on:click={() => (isfilterOpen = !isfilterOpen)}
          class="flex items-center justify-center gap-1.5 rounded bg-green-600 p-2.5 text-base font-medium text-white"
        >
          <Icon src={Funnel} size="24" />
        </button>
      </div>

      {#if isfilterOpen}
        <div transition:slide>
          <div class="mt-4 grid gap-2 rounded-lg border border-slate-200 p-4">
            <SortSelection />
            <CitySelection />
            <BrandSelection grid={true} />
          </div>
        </div>
      {/if}

      <CarList />
    </div>
  </aside>

  <div class="grow bg-gray-300">
    <CarsMap zoom={13} class="h-full w-full" />
  </div>

  <button
    on:click={() => {
      open = true
    }}
    class="block h-20 p-4 md:hidden"
  >
    <div class="flex gap-4">
      <Icon src={Funnel} size="24" class="text-green-600" />
      <p>Filters</p>
    </div>
  </button>
</main>

<BottomSheet bind:open>
  <Filters bind:open />
</BottomSheet>

<style lang="postcss">
  :global(html),
  :global(body) {
    @apply h-full;
  }
</style>
