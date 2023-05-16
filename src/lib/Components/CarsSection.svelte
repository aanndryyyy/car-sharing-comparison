<script lang="ts">
  import { _ } from 'svelte-i18n'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faMap } from '@fortawesome/fontawesome-free-regular'
  import { faSliders } from '@fortawesome/free-solid-svg-icons'
  import BottomSheet from 'svelte-swipeable-sheets/BottomSheet.svelte'
  import CarsMap from './CarsMap.svelte'
  import { getContext } from 'svelte'
  import Filters from '$lib/Components/Filters.svelte'
  const modal = getContext('simple-modal')

  const openMap = () => modal.open(CarsMap)
  let open = false
</script>

<section class="md:col-start-2 md:col-end-4">
  <div class="flex justify-between items-center">
    <div>
      <h3>{$_('cars.title')}</h3>
      <button
        class="flex gap-1 mt-2 block md:hidden"
        on:click={() => (open = true)}
      >
        <Fa icon={faSliders} rotate={90} color="green" size="1.2x" />
        <p class="text-green">Cheapest first</p>
      </button>
    </div>

    <button
      class="h-11 py-1.5 px-2 gap-2 flex items-center justify-center border-2 border-green rounded text-green block md:hidden"
      on:click={openMap}
    >
      <Fa icon={faMap} color="green" size="1.2x" />
      <h4>Map</h4>
    </button>
  </div>

  <div class="hidden md:block mt-4">
    <CarsMap />
  </div>

  <div class="grid gap-4 auto-cols-fr mt-8">
    <slot />
  </div>
</section>

<BottomSheet bind:open>
  <Filters bind:open />
</BottomSheet>
