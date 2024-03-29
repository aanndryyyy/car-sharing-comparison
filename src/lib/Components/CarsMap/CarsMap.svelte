<script lang="ts">
  import Loader from '../../../assets/icons/loader.svg'
  import placeholder from '../../../assets/images/placeholder.png?url&format=webp'
  import { map } from '$lib/Store/GoogleMapStore'
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
    $cars.forEach((car) =>
      car.markers.forEach((marker) => {
        if (
          marker.hidden ||
          ($carsSort.value === CarSortField.DISTANCE &&
            Number(marker.title) > 2)
        ) {
          marker.content!.classList.add('!hidden')
        }
      })
    )

    updateMarkers()
  }

  const bindMap = async (element: HTMLDivElement) => {
    const { Map } = (await google.maps.importLibrary('maps')) as google.maps

    const googleMap = new Map(element, {
      zoom,
      center,
      mapId: PUBLIC_GOOGLE_MAP_ID,
      mapTypeControl: false,
      fullscreenControl: false,
      zoomControl: false,
      streetViewControl: false,
    })

    $map = googleMap
    mapLoaded = true

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary

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

    duration.subscribe(updateMarkers)
    totalKilometres.subscribe(updateMarkers)
    visibleCars.subscribe(adjustMarkersVisibility)
    googleMap.addListener('dragend', updateMarkers)

    const userPos = await getPosition()
    new AdvancedMarkerElement({
      map: $map,
      content: userDot(),
      position: { lat: userPos.coords.latitude, lng: userPos.coords.longitude },
    })
  }
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

    <div class="h-full" use:bindMap />

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
