<script lang="ts">
  import { _ } from 'svelte-i18n'
  import BottomSheet from 'svelte-swipeable-sheets/BottomSheet.svelte'
  import CarsMap from './CarsMap/CarsMap.svelte'
  import { getContext } from 'svelte'
  import Filters from '$lib/Components/Filters.svelte'
  import { Icon, Funnel, Map } from 'svelte-hero-icons'
  import CarList from './Section/CarList/CarList.svelte'
  import CarListControls from './Section/CarListControls/CarListControls.svelte'

  let open: boolean = false
  let filtersOpen: boolean = false
</script>

<section class="md:col-start-2 md:col-end-4">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-2xl font-semibold md:text-3xl md:font-medium">
        {$_('cars.title')}
      </h2>
      <button
        class="mt-1 flex gap-1 text-green-600 md:hidden"
        on:click={() => (open = true)}
      >
        <Icon src={Funnel} size="16" />
        <p class="text-xs font-medium">Sort & Filters</p>
      </button>
    </div>

    <a
      href="/map"
      class="flex items-center justify-center gap-1.5 rounded bg-green-600 px-3 py-2 text-base font-medium text-white md:hidden"
    >
      Map
      <Icon src={Map} size="24" />
    </a>
  </div>

  <div class="mt-4 hidden md:mt-6 md:block">
    <CarsMap class="md:h-96 md:rounded-lg md:shadow-lg" />

    <BottomSheet bind:open={filtersOpen}>
      <Filters bind:open={filtersOpen} />
    </BottomSheet>
  </div>

  <CarListControls />
  <CarList />
</section>

<BottomSheet bind:open>
  <Filters bind:open />
</BottomSheet>
