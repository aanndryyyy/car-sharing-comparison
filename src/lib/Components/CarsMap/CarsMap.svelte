<script lang="ts">
  import { onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import { map } from '$lib/Store/GoogleMapStore'
  import { Loader } from '@googlemaps/js-api-loader'

  import {
    PUBLIC_GOOGLE_MAP_ID,
    PUBLIC_GOOGLE_API_KEY,
    PUBLIC_BACKEND_BASE_URL,
  } from '$env/static/public'
  import MapZoomControl from './MapZoomControl.svelte'

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

      const res = await fetch(PUBLIC_BACKEND_BASE_URL + 'location')
      const locations = await res.json()

      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary

      locations.forEach((provider) => {
        provider.coordinates.forEach((location) => {
          const { lat, lng } = location
          const dotIcon = document.createElement('div')

          if (provider.provider === 'citybee') {
            dotIcon.className = 'dot-icon bg-brand-citybee'
          } else if (provider.provider === 'bolt') {
            dotIcon.className = 'dot-icon bg-brand-bolt'
          }

          const marker = new AdvancedMarkerElement({
            map: $map,
            position: { lat, lng } as google.maps.LatLngLiteral,
            title: provider.provider + ', ' + location.serviceId,
            content: dotIcon,
          })

          markers.push({
            provider: provider.provider,
            serviceId: location.serviceId,
            marker,
          })
        })
      })

      google.maps.event.addListener($map, 'zoom_changed', () => {
        zoom = $map.getZoom()

        markers.forEach((marker) => {
          const dotIcon = document.createElement('div')

          if (marker.provider === 'citybee') {
            dotIcon.className = 'dot-icon bg-brand-citybee'
          } else if (marker.provider === 'bolt') {
            dotIcon.className = 'dot-icon bg-brand-bolt'
          }

          if (zoom < 14) {
            marker.marker.content = dotIcon
          } else {
            const priceIcon = document.createElement('div')
            priceIcon.className = 'price-icon'

            priceIcon.innerText = marker.serviceId + '€'
            priceIcon.appendChild(dotIcon)

            marker.marker.content = priceIcon
          }
        })
      })
    })
  })

  let mapCanvas: HTMLDivElement
</script>

<div class="relative">
  <div class="h-screen md:h-96 md:rounded-lg md:shadow-lg" bind:this={mapCanvas} />

  <MapZoomControl />
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
