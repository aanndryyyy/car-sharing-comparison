<script lang="ts">
  import { onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import { map } from '$lib/Store/GoogleMapStore'
  import { Loader } from '@googlemaps/js-api-loader'
  import placeholder from '$lib/Images/placeholder.png'
  import LoaderIcon from '$lib/Icons/Loader.svelte'

  import {
    PUBLIC_GOOGLE_MAP_ID,
    PUBLIC_GOOGLE_API_KEY,
    PUBLIC_BACKEND_BASE_URL,
  } from '$env/static/public'
  import MapZoomControl from './MapZoomControl.svelte'
  import MapFullScreenControl from './MapFullScreenControl.svelte'
  import ExclamationTriangleIcon from '$lib/Icons/Outline/ExclamationTriangleIcon.svelte'
  import { carsBolt, carsCityBee } from '$lib/Store/Cars'
  import { duration } from '$lib/Store/DurationStore'

  export let center: google.maps.LatLngLiteral = {
    lat: 59.437066,
    lng: 24.7509811,
  }
  export let zoom: number = 12

  let markers: {
    provider: string
    serviceId: number
    marker: google.maps.marker.AdvancedMarkerElement
  }[] = []

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

    google.maps.event.addListener($map, 'tilesloaded', () => {
      mapLoaded = true
    })

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary

    $carsBolt.forEach((car) => {
      car.initialiseMarkers(AdvancedMarkerElement, $map)
    })

    $carsCityBee.forEach((car) => {
      car.initialiseMarkers(AdvancedMarkerElement, $map)
    })

    google.maps.event.addListener($map, 'zoom_changed', () => {
      zoom = $map.getZoom()

      $carsCityBee.forEach((car) => {
        if (zoom < 14) {
          car.setMarkerIcons()
        } else {
          car.setMarkerIcons('price')
        }
      })

      $carsBolt.forEach((car) => {
        if (zoom < 14) {
          car.setMarkerIcons()
        } else {
          car.setMarkerIcons('price')
        }
      })
    })
  })

  duration.subscribe(() => {
    zoom = $map?.getZoom() || 13

    $carsCityBee.forEach((car) => {
      if (zoom < 14) return
      car.setMarkerIcons('price')
    })

    $carsBolt.forEach((car) => {
      if (zoom < 14) return
      car.setMarkerIcons('price')
    })
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
