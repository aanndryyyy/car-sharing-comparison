<script lang="ts">
  import { map, userPosition } from '$lib/Store/GoogleMapStore'

  import MinusIcon from '$lib/Icons/Mini/MinusIcon.svelte'
  import PlusIcon from '$lib/Icons/Mini/PlusIcon.svelte'
  import LocationTargetIcon from '$lib/Icons/Outline/LocationTargetIcon.svelte'
  import { getPosition } from '$lib/helpers/position'

  function setCurrentLocation() {
    getPosition()
      .then((position) => {
        $map.setZoom(13)
        $map.panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
      .catch((err) => {
        alert('Failed to load location: ' + err)
      })
  }
</script>

<div
  class="absolute bottom-7 right-4 flex flex-col items-center justify-center gap-2"
>
  <button
    on:click={setCurrentLocation}
    class="flex h-8 w-8 items-center justify-center rounded-md bg-white px-0.5 py-0 text-slate-600 shadow-lg shadow-black/20 transition-[fill] hover:text-green-600"
    title="Show your current location"
  >
    <LocationTargetIcon class="h-5 w-5" />
  </button>

  <div class="rounded-md bg-white px-0.5 py-0 shadow-lg shadow-black/20">
    <button
      on:click={() => $map.setZoom($map.getZoom() + 1)}
      class="flex h-8 w-7 items-center justify-center border-b border-slate-200 fill-slate-600 transition-[fill] hover:fill-green-600"
      title="Zoom in"
    >
      <PlusIcon />
    </button>
    <button
      on:click={() => $map.setZoom($map.getZoom() - 1)}
      class="flex h-8 w-7 items-center justify-center fill-slate-600 transition-[fill] hover:fill-green-600"
      title="Zoom out"
    >
      <MinusIcon />
    </button>
  </div>
</div>
