<script lang="ts">
  import { onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import { map, mapCanvas } from '$lib/Store/GoogleMapStore'
  import { Loader } from '@googlemaps/js-api-loader'
  import BottomSheet from 'svelte-swipeable-sheets/BottomSheet.svelte'
  import Filters from '$lib/Components/Filters.svelte'

  import MinusIcon from '$lib/Icons/Mini/MinusIcon.svelte'
  import PlusIcon from '$lib/Icons/Mini/PlusIcon.svelte'

  import {
    PUBLIC_GOOGLE_MAP_ID,
    PUBLIC_GOOGLE_API_KEY,
    PUBLIC_BACKEND_BASE_URL,
  } from '$env/static/public'

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
        new Map($mapCanvas, {
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
      locations = await res.json()

      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary

      locations.forEach((provider) => {
        provider.coordinates.forEach((location) => {
          const { lat, lng } = location

          const dotIcon = document.createElement('div')
          const priceIcon = document.createElement('div')

          if (provider.provider === 'citybee') {
            dotIcon.className = 'dot-icon bg-brand-citybee'
            priceIcon.className = 'price-icon bg-brand-citybee'
          } else if (provider.provider === 'bolt') {
            dotIcon.className = 'dot-icon bg-brand-bolt'
            priceIcon.className = 'price-icon bg-brand-bolt'
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
          const priceIcon = document.createElement('div')
          const priceDotIcon = document.createElement('div')

          if (marker.provider === 'citybee') {
            dotIcon.className = 'dot-icon bg-brand-citybee'
            priceIcon.className = 'price-icon bg-brand-citybee'
          } else if (marker.provider === 'bolt') {
            dotIcon.className = 'dot-icon bg-brand-bolt'
            priceIcon.className = 'price-icon bg-brand-bolt'
          }

          priceIcon.innerText = marker.serviceId + '€'
          priceIcon.appendChild(dotIcon)

          if (zoom < 14) {
            marker.marker.content = dotIcon
          } else {
            marker.marker.content = priceIcon
          }
        })
      })
    })
  })

  let open = false
  let locations
</script>

<div class="relative">
  <div class="h-96 rounded-lg shadow-lg" bind:this={$mapCanvas} />

  <div
    class="absolute right-4 bottom-7 flex flex-col items-center justify-center rounded-md bg-white px-0.5 py-0 shadow-lg shadow-black/20"
  >
    <button
      on:click={() => $map.setZoom($map.getZoom() + 1)}
      class="flex h-8 w-7 items-center justify-center border-b border-slate-200 fill-slate-600 transition-[fill] hover:fill-green-600"
    >
      <PlusIcon />
    </button>
    <button
      on:click={() => $map.setZoom($map.getZoom() - 1)}
      class="flex h-8 w-7 items-center justify-center fill-slate-600 transition-[fill] hover:fill-green-600"
    >
      <MinusIcon />
    </button>
  </div>
</div>

<BottomSheet bind:open>
  <Filters bind:open />
</BottomSheet>

<style lang="postcss">
  :global(.dot-icon) {
    @apply h-3 w-3 rounded-full shadow ring-1 ring-gray-300 ring-offset-1;
  }

  :global(.price-icon) {
    @apply flex flex-row-reverse items-center justify-center gap-1.5 rounded-full border border-slate-400 bg-white pr-1.5 pl-[2px] shadow-sm;
    @apply h-[22px] font-sans text-sm leading-none;
  }
  :global(.price-icon > .dot-icon) {
    @apply h-4 w-4 shadow-none ring-0 ring-offset-0;
  }
</style>
