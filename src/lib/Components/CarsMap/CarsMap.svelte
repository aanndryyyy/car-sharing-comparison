<script lang="ts">
  import LoaderIcon from '$lib/Icons/Loader.svelte'
  import placeholder from '$lib/Images/placeholder.png'
  import { map } from '$lib/Store/GoogleMapStore'
  import { onMount } from 'svelte'

  import { PUBLIC_GOOGLE_MAP_ID } from '$env/static/public'
  import GenericMappableCar from '$lib/Car/GenericMappableCar'
  import ExclamationTriangleIcon from '$lib/Icons/Outline/ExclamationTriangleIcon.svelte'
  import { cars, visibleCars } from '$lib/Store/Cars'
  import { duration } from '$lib/Store/DurationStore'
  import { totalKilometres } from '$lib/Store/TotalKilometresStore'
  import MapBottomRightControls from './MapBottomRightControls.svelte'
  import MapFullScreenControl from './MapFullScreenControl.svelte'

  export let center: google.maps.LatLngLiteral = {
    lat: 59.437066,
    lng: 24.7509811,
  }
  export let zoom: number = 12
  export let iconsZoom: number = 14

  let mapLoaded: boolean = false
  let isError: boolean = false

  onMount(async () => {
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary

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

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary

    $cars.forEach((car) => {
      car.initialiseMarkers(AdvancedMarkerElement, $map)
    })

    googleMap.addListener('zoom_changed', () => {
      let mapZoom = googleMap.getZoom()!

      $visibleCars.visible.forEach((car) => {
        if (!(car instanceof GenericMappableCar)) {
          return
        }

        if (mapZoom < iconsZoom) {
          car.setMarkerIcons()
        } else {
          car.setMarkerIcons('price')
        }
      })
    })

    duration.subscribe(updateMarkers)
    totalKilometres.subscribe(updateMarkers)
    visibleCars.subscribe(toggleMarkers)
    googleMap.addListener('dragend', updateMarkers)

    function updateMarkers() {
      const carsToUpdate = $visibleCars.visible.filter(
        (car) => car instanceof GenericMappableCar
      ) as GenericMappableCar[]

      const mapZoom = $map.getZoom()
      const mapBounds = $map.getBounds()

      carsToUpdate.forEach((car) => {
        car.markers.forEach((marker) => {
          if (!mapBounds || !mapBounds.contains(marker.position!)) {
            return
          }

          if (!mapZoom || mapZoom < iconsZoom) {
            return
          }

          car.setMarkerIcon(marker, 'price')
        })
      })
    }

    function toggleMarkers() {
      const carsToShow = $visibleCars.visible.filter(
        (car) => car instanceof GenericMappableCar
      ) as GenericMappableCar[]

      carsToShow.forEach((car) => {
        const markers = car.markers.filter((marker) => marker.map === null)
        markers.forEach((marker) => (marker.map = $map))
      })

      const carsToHide = $visibleCars.hidden.filter(
        (car) => car instanceof GenericMappableCar
      ) as GenericMappableCar[]

      carsToHide.forEach((car) => {
        const markers = car.markers.filter((marker) => marker.map !== null)
        markers.forEach((marker) => (marker.map = null))
      })
    }
  })

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
      <LoaderIcon
        class={`h-10 w-10 animate-spin text-white ${mapLoaded ? 'hidden' : ''}`}
      />
    </div>

    <div class="h-full" bind:this={mapCanvas} />
    <MapFullScreenControl />
    <MapBottomRightControls />
  {:else}
    <div
      class="absolute inset-0 z-20 flex items-center justify-center bg-amber-400"
    >
      <ExclamationTriangleIcon class="h-10 w-10 text-white" />
    </div>
  {/if}
</div>
