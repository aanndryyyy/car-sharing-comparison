<script lang="ts">
  import './page.css'

  import '$lib/i18n'
  import { isLoading } from 'svelte-i18n'
  import TopBarNavigation from '$lib/Components/TopBarNavigation.svelte'
  import { onMount } from 'svelte'
  import { invalidate } from '$app/navigation'
  import { map } from '../lib/Store/GoogleMapStore'
  import { cars } from '$lib/Store/Cars'

  export let data

  $cars = data.cars

  onMount(async () => {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary

    const interval = setInterval(() => {
      invalidate('/api/location')

      $cars.forEach((car) =>
        car.markers.forEach((marker) => {
          marker.map = null
        })
      )

      data.cars.forEach((car) =>
        car.initialiseMarkers(AdvancedMarkerElement, $map)
      )

      $cars = data.cars
    }, 60000)
    return () => clearInterval(interval)
  })
</script>

<TopBarNavigation />
{#if !$isLoading}
  <slot />
{/if}
