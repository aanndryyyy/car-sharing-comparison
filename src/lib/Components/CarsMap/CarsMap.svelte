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

  const loader = new Loader({
    apiKey: PUBLIC_GOOGLE_API_KEY,
    version: 'weekly',
  })

  let mapLoaded: boolean = false
  let isError: boolean = false

  onMount(async () => {
    loader.load().then(async () => {
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

      const boltContent = document.createElement('div')
      boltContent.className = 'dot-icon bg-brand-bolt'

      $carsBolt.forEach((car) => {
        car.initialiseMarkers(AdvancedMarkerElement, boltContent, $map)
      })

      const cityBeeContent = document.createElement('div')
      cityBeeContent.className = 'dot-icon bg-brand-citybee'

      $carsCityBee.forEach((car) => {
        car.initialiseMarkers(AdvancedMarkerElement, cityBeeContent, $map)
      })

      google.maps.event.addListener($map, 'zoom_changed', () => {
        zoom = $map.getZoom()

        const dotIcon = document.createElement('div')
        const priceIcon = document.createElement('div')
        priceIcon.className = 'price-icon'

        $carsBolt.forEach((car) => {
          dotIcon.className = 'dot-icon bg-brand-bolt'

          car.markers.forEach((marker) => {
            if (zoom < 14) {
              marker.content = dotIcon
            } else {
              priceIcon.innerText = Math.round(Math.random() * 100) + '€'
              priceIcon.appendChild(dotIcon)

              marker.content = priceIcon
            }
          })
        })
      })
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

<style lang="postcss">
  :global(.dot-icon) {
    @apply h-3 w-3 rounded-full shadow ring-1 ring-gray-300 ring-offset-1;
  }

  :global(.price-icon) {
    @apply flex flex-row-reverse items-center justify-center gap-1.5 rounded-full border border-slate-400 bg-white pl-[2px] pr-1.5 shadow-sm;
    @apply h-[22px] font-sans text-sm leading-none;
  }
  :global(.price-icon > .dot-icon) {
    @apply h-4 w-4 shadow-none ring-0 ring-offset-0;
  }
</style>
