<script lang="ts">
  import Loader from '../../../assets/icons/loader.svg'
  import placeholder from '../../../assets/images/placeholder.png'
  import { map } from '$lib/Store/GoogleMapStore'
  import { onMount } from 'svelte'
  import { PUBLIC_GOOGLE_MAP_ID } from '$env/static/public'
  import { cars, visibleCars } from '$lib/Store/Cars'
  import { duration } from '$lib/Store/DurationStore'
  import { totalKilometres } from '$lib/Store/TotalKilometresStore'
  import MapBottomRightControls from './MapBottomRightControls.svelte'
  import MapFullScreenControl from './MapFullScreenControl.svelte'
  import { Icon, ExclamationTriangle } from 'svelte-hero-icons'
  import { carsSort } from '../../Store/FilterStore'
  import { CarSortField } from '../../Types/Enums/CarSortField'
  import { getPosition } from '../../../helpers/position'
  import userDot from '../../../helpers/htmlElements'

  export let center: google.maps.LatLngLiteral = {
    lat: 59.437066,
    lng: 24.7509811,
  }
  export let zoom: number = 12
  export let iconsZoom: number = 14

  let mapLoaded: boolean = false
  let isError: boolean = false

  onMount(async () => {
    const [{ Map }, { AdvancedMarkerElement }, userPos] = await Promise.all([
      google.maps.importLibrary('maps'),
      google.maps.importLibrary('marker'),
      getPosition(),
    ])

    const googleMap = new Map(mapCanvas, {
      zoom,
      center,
      mapId: PUBLIC_GOOGLE_MAP_ID,
      mapTypeControl: false,
      fullscreenControl: false,
      zoomControl: false,
      streetViewControl: false,
    })

    $map = googleMap

    googleMap.addListener('tilesloaded', () => {
      mapLoaded = true
    })

    $cars.forEach((car) => {
      car.initialiseMarkers(AdvancedMarkerElement, $map)
    })

    googleMap.addListener('zoom_changed', () => {
      let mapZoom = googleMap.getZoom()!
      if (mapZoom < iconsZoom) {
        $visibleCars.forEach((car) => car.setMarkerIcons())
      } else {
        $visibleCars.forEach((car) => car.setMarkerIcons('price'))
      }
    })

    new AdvancedMarkerElement({
      map: $map,
      content: userDot(),
      position: { lat: userPos.coords.latitude, lng: userPos.coords.longitude },
    })

    duration.subscribe(updateMarkers)
    totalKilometres.subscribe(updateMarkers)
    visibleCars.subscribe(adjustMarkersVisibility)
    googleMap.addListener('dragend', updateMarkers)
  })

  function updateMarkers() {
    const mapZoom = $map.getZoom()
    const mapBounds = $map.getBounds()
    if (!mapBounds || !mapZoom) return

    const icon = mapZoom >= iconsZoom ? 'price' : null
    $visibleCars.forEach((car) => {
      car.markers.forEach((marker, index) => {
        if (!mapBounds.contains(marker.position!)) return
        car.setMarkerIcon(marker, index, icon)
      })
    })
  }

  function adjustMarkersVisibility() {
    $cars.forEach((car) =>
      car.markers.forEach((marker) => marker.content!.classList.add('!hidden'))
    )
    $visibleCars.forEach((car) =>
      car.markers.forEach((marker) =>
        marker.content!.classList.remove('!hidden')
      )
    )
    if ($carsSort.value === CarSortField.DISTANCE) {
      $cars.forEach((car) =>
        car.markers.forEach((marker) => {
          if (Number(marker.title) > 2) {
            marker.content!.classList.add('!hidden')
          }
        })
      )
    }

    updateMarkers()
  }

  let mapCanvas: HTMLDivElement
</script>

<div class={`relative overflow-hidden ${$$props.class}`}>
  {#if !isError}
    <img
      src={placeholder}
      alt=""
      class="absolute inset-0 z-10 h-full w-full"
      class:hidden={mapLoaded}
    />
    <div
      class="absolute inset-0 z-20 flex items-center justify-center bg-white/10 backdrop-blur-md transition-[backdrop-filter]"
      class:pointer-events-none={mapLoaded}
      class:backdrop-blur-none={mapLoaded}
    >
      <Loader
        width="32"
        height="32"
        class={`animate-spin text-white ${mapLoaded ? 'hidden' : ''}`}
      />
    </div>

    <div class="h-full" bind:this={mapCanvas} />
    <MapFullScreenControl />
    <MapBottomRightControls />
  {:else}
    <div
      class="absolute inset-0 z-20 flex items-center justify-center bg-amber-400"
    >
      <Icon src={ExclamationTriangle} size="32" class="text-white" />
    </div>
  {/if}
</div>

<style lang="postcss">
  .bg-brand-bolt {
    background: #34d186;
  }

  .bg-brand-citybee {
    background: #ff3802;
  }
</style>
