<script lang="ts">
  import { onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import { map, mapCanvas } from '$lib/Store/GoogleMapStore'
  import BottomSheet from 'svelte-swipeable-sheets/BottomSheet.svelte'
  import Filters from '$lib/Components/Filters.svelte'

  import { PUBLIC_GOOGLE_MAP_ID, PUBLIC_GOOGLE_API_KEY, PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

  export let center: google.maps.LatLngLiteral = {
    lat: 59.437066,
    lng: 24.7509811,
  }
  export let zoom: number = 12

  let markers: {
    provider: string
    marker: google.maps.marker.AdvancedMarkerElement
  }[] = []

  onMount(async () => {
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
        streetViewControl: false,
      })
    )

    const res = await fetch( PUBLIC_BACKEND_BASE_URL + 'location' )
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

        markers.push({ provider: provider.provider, marker })
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

        priceIcon.innerText = marker.provider
        priceIcon.appendChild(dotIcon)

        if (zoom < 16) {
          marker.marker.content = dotIcon
        } else {
          marker.marker.content = priceIcon
        }
      })
    })
  })

  let open = false
  let locations
</script>

<svelte:head>
  <script>
    ;((g) => {
      var h,
        a,
        k,
        p = 'The Google Maps JavaScript API',
        c = 'google',
        l = 'importLibrary',
        q = '__ib__',
        m = document,
        b = window
      b = b[c] || (b[c] = {})
      var d = b.maps || (b.maps = {}),
        r = new Set(),
        e = new URLSearchParams(),
        u = () =>
          h ||
          (h = new Promise(async (f, n) => {
            await (a = m.createElement('script'))
            e.set('libraries', [...r] + '')
            for (k in g)
              e.set(
                k.replace(/[A-Z]/g, (t) => '_' + t[0].toLowerCase()),
                g[k]
              )
            e.set('callback', c + '.maps.' + q)
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e
            d[q] = f
            a.onerror = () => (h = n(Error(p + ' could not load.')))
            a.nonce = m.querySelector('script[nonce]')?.nonce || ''
            m.head.append(a)
          }))
      d[l]
        ? console.warn(p + ' only loads once. Ignoring:', g)
        : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)))
    })({
      key: PUBLIC_GOOGLE_API_KEY,
      v: 'weekly',
    })
  </script>
</svelte:head>

<div>
  <div class="h-96 rounded-lg shadow-lg" bind:this={$mapCanvas} />
</div>

<BottomSheet bind:open>
  <Filters bind:open />
</BottomSheet>

<style lang="postcss">
  
  :global(.dot-icon) {
    @apply h-3 w-3 rounded-full shadow ring-1 ring-gray-300 ring-offset-1;
  }

  :global(.price-icon) {
    @apply flex flex-row-reverse items-center justify-center gap-1 rounded-full border border-slate-300 bg-white pr-1;
  }
</style>
