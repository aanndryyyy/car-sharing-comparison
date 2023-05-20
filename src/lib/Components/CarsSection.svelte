<script lang="ts">
  import { _ } from 'svelte-i18n'
  import BottomSheet from 'svelte-swipeable-sheets/BottomSheet.svelte'
  import CarsMap from './CarsMap.svelte'
  import { getContext } from 'svelte'
  import Filters from '$lib/Components/Filters.svelte'
  import { Icon, Funnel, Map } from 'svelte-hero-icons'
  import BrandMultiSelect from '$lib/Components/BrandMultiSelect.svelte'
  const modal = getContext('simple-modal')

  const openMap = () => modal.open(CarsMap)
  let open = false
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
      class="block flex items-center justify-center gap-1.5 rounded bg-green-600 py-2 px-3 text-white md:hidden"
      on:click={openMap}
    >
      <p class="text-base font-medium">Map</p>
      <Icon src={Map} size="24" />
    </button>
  </div>

  <div class="mt-4 hidden md:block">
    <CarsMap />
  </div>

  <div class="mt-8 flex justify-between md:flex">
    <div>
      <p>closest first</p>
    </div>
    <div class="flex gap-4">
      <BrandMultiSelect />
      <p>type</p>
      <p>fuel</p>
    </div>
  </div>

  <div class="mt-4 space-y-4">
    <slot />
  </div>
</section>

<BottomSheet bind:open>
  <Filters bind:open />
</BottomSheet>
