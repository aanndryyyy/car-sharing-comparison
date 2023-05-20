<script lang="ts">
  import { _ } from 'svelte-i18n'
  import BottomSheet from 'svelte-swipeable-sheets/BottomSheet.svelte'
  import CarsMap from './CarsMap.svelte'
  import { getContext } from 'svelte'
  import Filters from '$lib/Components/Filters.svelte'
  import { Icon, Funnel, Map } from 'svelte-hero-icons'
  const modal = getContext('simple-modal')

  const openMap = () => modal.open(CarsMap)
  let open = false
</script>

<section class="md:col-start-2 md:col-end-4">
  <div class="flex justify-between items-center">
    <div>
      <h3>{$_('cars.title')}</h3>
      <button
        class="flex gap-1 mt-2 block md:hidden text-green-600"
        on:click={() => (open = true)}
      >
        <Icon src={Funnel} size="16" />
        <p class="text-xs font-medium">Sort & Filters</p>
      </button>
    </div>

    <button
      class="py-2 px-3 gap-1.5 flex items-center justify-center rounded text-white bg-green-600 block md:hidden"
      on:click={openMap}
    >
      <p class="text-base font-medium">Map</p>
      <Icon src={Map} size="24" />
    </button>
  </div>

  <div class="hidden md:block mt-4">
    <CarsMap />
  </div>

  <div class="flex justify-between hidden md:block">
    <div>
      <p>closest first</p>
    </div>
    <div class="flex gap-4">
      <p>brand</p>
      <p>type</p>
      <p>fuel</p>
    </div>
  </div>

  <div class="grid gap-4 auto-cols-fr mt-8">
    <slot />
  </div>
</section>

<BottomSheet bind:open>
  <Filters bind:open />
</BottomSheet>
