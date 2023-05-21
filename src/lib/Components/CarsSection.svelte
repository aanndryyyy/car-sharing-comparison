<script lang="ts">
  import { _ } from 'svelte-i18n'
  import BottomSheet from 'svelte-swipeable-sheets/BottomSheet.svelte'
  import CarsMap from './CarsMap/CarsMap.svelte'
  import { getContext } from 'svelte'
  import Filters from '$lib/Components/Filters.svelte'
  import { Icon, Funnel, Map } from 'svelte-hero-icons'
  import CarList from './Section/CarList/CarList.svelte'
  import CarListControls from './Section/CarListControls/CarListControls.svelte'
  const modal = getContext('simple-modal')

  const openMap = () => modal.open(CarsMap)
  let open: boolean = false
  let filtersOpen: boolean = false
</script>

<section class="md:col-start-2 md:col-end-4">
  <div class="flex items-center justify-between">
    <div>
      <h3>{$_('cars.title')}</h3>
      <button
        class="mt-2 block flex gap-1 text-green-600 md:hidden"
        on:click={() => (open = true)}
      >
        <Icon src={Funnel} size="16" />
        <p class="text-xs font-medium">Sort & Filters</p>
      </button>
    </div>

    <button
      class="block flex items-center justify-center gap-1.5 rounded bg-green-600 px-3 py-2 text-white md:hidden"
      on:click={openMap}
    >
      <p class="text-base font-medium">Map</p>
      <Icon src={Map} size="24" />
    </button>
  </div>

  <div class="mt-4 hidden md:block">
    <CarsMap />

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
