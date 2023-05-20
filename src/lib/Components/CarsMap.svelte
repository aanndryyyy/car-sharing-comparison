<script lang="ts">
  import { _ } from 'svelte-i18n'
  import BottomSheet from 'svelte-swipeable-sheets/BottomSheet.svelte'
  import Filters from '$lib/Components/Filters.svelte'

  let open = false
</script>

<div>
  <!--    <GoogleMap apiKey="your-maps-api-key"/>-->
  <img
    src="https://developers.google.com/static/maps/images/landing/hero_maps_static_api_480.png"
    alt="testing"
  />
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
