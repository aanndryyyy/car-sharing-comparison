<script lang="ts">
  import { onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import { map } from '$lib/Store/GoogleMapStore'
  import placeholder from '$lib/Images/placeholder.png'
  import LoaderIcon from '$lib/Icons/Loader.svelte'

  import { PUBLIC_GOOGLE_MAP_ID } from '$env/static/public'
  import MapZoomControl from './MapZoomControl.svelte'
  import MapFullScreenControl from './MapFullScreenControl.svelte'
  import ExclamationTriangleIcon from '$lib/Icons/Outline/ExclamationTriangleIcon.svelte'
  import { cars, pricingParams, visibleCars } from '$lib/Store/Cars'
  import BoltCar from '$lib/Car/BoltCar'
  import CityBeeCar from '$lib/Car/CityBeeCar'

  export let center: google.maps.LatLngLiteral = {
    lat: 59.437066,
    lng: 24.7509811,
  }
  export let zoom: number = 12

  let mapLoaded: boolean = false
  let isError: boolean = false

  onMount(async () => {
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary

    map.set(
      new Map(mapCanvas, {
        zoom,
        center,
        mapId: PUBLIC_GOOGLE_MAP_ID,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
      })
    )

    $map.addListener('tilesloaded', () => {
      mapLoaded = true
    })

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary

    $cars.forEach((car) => {
      car.initialiseMarkers(AdvancedMarkerElement, $map)
    })

    $map.addListener('zoom_changed', () => {
      let mapZoom = $map.getZoom()!

      $visibleCars.forEach((car) => {
        if (!(car instanceof BoltCar) && !(car instanceof CityBeeCar)) {
          return
        }

        if (mapZoom < 14) {
          car.setMarkerIcons()
        } else {
          car.setMarkerIcons('price')
        }
      })
    })

    pricingParams.subscribe(updateMarkers)
    $map.addListener('dragend', updateMarkers)

    function updateMarkers() {
      let mapZoom = $map.getZoom()

      if (!mapZoom || mapZoom < 14) {
        return
      }

      $visibleCars.forEach((car) => {
        if (!(car instanceof BoltCar) && !(car instanceof CityBeeCar)) {
          return
        }

        car.markers.forEach((marker) => {
          if (!$map.getBounds()?.contains(marker.position!)) {
            return
          }

          car.setMarkerIcon(marker, 'price')
        })
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
    <MapZoomControl />
  {:else}
    <div
      class="absolute inset-0 z-20 flex items-center justify-center bg-amber-400"
    >
      <ExclamationTriangleIcon class="h-10 w-10 text-white" />
    </div>
  {/if}
</div>
