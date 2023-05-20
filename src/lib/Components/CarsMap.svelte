<script lang="ts">
  import { onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import { map, mapCanvas } from '$lib/Store/GoogleMapStore'
  import BottomSheet from 'svelte-swipeable-sheets/BottomSheet.svelte'
  import Filters from '$lib/Components/Filters.svelte'

  export let center: google.maps.LatLngLiteral = {
    lat: 59.437066,
    lng: 24.7509811,
  }
  export let zoom: number = 12

  onMount(async () => {
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary

    map.set(
      new Map($mapCanvas, {
        zoom,
        center,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      })
    )

    const res = await fetch(
      ''
    )
    locations = await res.json()

    const { Marker } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary

    locations.forEach((provider) => {
      provider.coordinates.forEach((location) => {
        const { lat, lng } = location

        new Marker({
          map: $map,
          position: { lat, lng } as google.maps.LatLngLiteral,
          title: provider.provider + ', ' + location.serviceId,
        })
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
      key: '',
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
