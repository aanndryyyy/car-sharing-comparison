<script lang="ts">
  import Loader from '../../../assets/icons/loader.svg'
  import placeholder from '../../../assets/images/placeholder.png'
  import { map } from '$lib/Store/GoogleMapStore'
  import { onMount } from 'svelte'
  import { PUBLIC_GOOGLE_MAP_ID } from '$env/static/public'
  import GenericMappableCar from '$lib/Car/GenericMappableCar'
  import { cars, visibleCars } from '$lib/Store/Cars'
  import { duration } from '$lib/Store/DurationStore'
  import { totalKilometres } from '$lib/Store/TotalKilometresStore'
  import MapBottomRightControls from './MapBottomRightControls.svelte'
  import MapFullScreenControl from './MapFullScreenControl.svelte'
  import { Icon, ExclamationTriangle } from 'svelte-hero-icons'

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
    visibleCars.subscribe(adjustMarkersVisibility)
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

    function adjustMarkersVisibility() {
      const carsToShow = $visibleCars.visible.filter(
        (car) => car instanceof GenericMappableCar
      ) as GenericMappableCar[]

      carsToShow.forEach((car) => {
        let markers = car.markers.filter((marker) => marker.content !== null)

        markers = car.markers.filter(
          (marker) => marker.content!.classList.contains('!hidden')!
        )

        markers.forEach((marker) => marker.content!.classList.remove('!hidden'))
      })

      const carsToHide = $visibleCars.hidden.filter(
        (car) => car instanceof GenericMappableCar
      ) as GenericMappableCar[]

      carsToHide.forEach((car) => {
        let markers = car.markers.filter((marker) => marker.content !== null)

        markers = car.markers.filter(
          (marker) => !marker.content!.classList.contains('!hidden')
        )

        markers.forEach((marker) => marker.content!.classList.add('!hidden'))
      })

      updateMarkers()
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
    @apply bg-green-500;
  }
  .bg-brand-citybee {
    @apply bg-orange-500;
  }
</style>
