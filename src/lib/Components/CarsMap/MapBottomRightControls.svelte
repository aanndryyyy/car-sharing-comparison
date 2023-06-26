<script lang="ts">
  import { map } from '$lib/Store/GoogleMapStore'

  import LocationTargetIcon from '../../../assets/icons/location-target.svg'
  import { Icon, MinusSmall, PlusSmall } from 'svelte-hero-icons'
  import { getPosition } from '../../../helpers/position'

  const zoomToCurrentLocation = () => {
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
    on:click={zoomToCurrentLocation}
    class="flex h-8 w-8 items-center justify-center rounded-md bg-white px-0.5 py-0 text-slate-600 shadow-lg shadow-black/20 transition-[fill] hover:text-green-600"
    title="Show your current location"
  >
    <LocationTargetIcon />
  </button>

  <div class="rounded-md bg-white px-0.5 py-0 shadow-lg shadow-black/20">
    <button
      on:click={() => $map.setZoom($map.getZoom() + 1)}
      class="flex h-8 w-7 items-center justify-center border-b border-slate-200 fill-slate-600 transition-[fill] hover:fill-green-600"
      title="Zoom in"
    >
      <Icon src={PlusSmall} size="24" class="text-slate-600" />
    </button>
    <button
      on:click={() => $map.setZoom($map.getZoom() - 1)}
      class="flex h-8 w-7 items-center justify-center fill-slate-600 transition-[fill] hover:fill-green-600"
      title="Zoom out"
    >
      <Icon src={MinusSmall} size="24" class="text-slate-600" />
    </button>
  </div>
</div>
