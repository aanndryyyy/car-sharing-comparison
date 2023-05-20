<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { MapContainer } from '$lib/Store/MapContainerStore'
  import BottomSheet from 'svelte-swipeable-sheets/BottomSheet.svelte'
  import Filters from '$lib/Components/Filters.svelte'

  let open = false
</script>

<div>
  <div class="h-96" bind:this={$MapContainer} />
  
  <button
    class="h-10 w-full border-gray-300 border-2 block md:hidden"
    on:click={() => (open = true)}
  >
    {$_('filters')}
  </button>
</div>

<BottomSheet bind:open>
  <Filters bind:open />
</BottomSheet>
