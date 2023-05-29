<script lang="ts">
  import { onMount } from 'svelte'
  import { days, duration, hours, minutes } from '$lib/Store/DurationStore'
  import { totalKilometres } from '$lib/Store/TotalKilometresStore'
  import { map } from '$lib/Store/GoogleMapStore'
  import { Loader } from '@googlemaps/js-api-loader'
  import { PUBLIC_GOOGLE_API_KEY } from '$env/static/public'
  import WaypointInput from './WaypointInput.svelte'
  import LoaderIcon from '$lib/Icons/Loader.svelte'

  import {
    Switch,
    SwitchLabel,
    SwitchGroup,
  } from '@rgossiaux/svelte-headlessui'
  import PlusCircleIcon from '$lib/Icons/Outline/PlusCircleIcon.svelte'

  let isRoundTrip: boolean = false

  let GoogleAutocomplete: typeof google.maps.places.Autocomplete
  let GoogleAdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement
  let inputWaypoints: {
    id: number
    input?: HTMLInputElement
    autocomplete?: google.maps.places.Autocomplete
  }[] = [{ id: Date.now() + Math.random() }, { id: Date.now() + Math.random() }]

  const autocompleteOptions: google.maps.places.AutocompleteOptions = {
    componentRestrictions: { country: 'ee' },
    fields: ['address_components', 'geometry', 'icon', 'name'],
    strictBounds: false,
    types: ['street_address', 'street_number', 'locality', 'route'],
  }

  onMount(async () => {
    const { Autocomplete } = (await google.maps.importLibrary(
      'places'
    )) as google.maps.PlacesLibrary

    GoogleAutocomplete = Autocomplete

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary

    GoogleAdvancedMarkerElement = AdvancedMarkerElement
  })

  function calculateRoute(roundTrip: boolean) {
    const starting = inputWaypoints[0]?.autocomplete
    const destination = inputWaypoints.slice(-1)[0]?.autocomplete

    if (!starting || !destination) {
      return
    }

    const placeStarting = starting.getPlace()
    const placeDestination = destination.getPlace()

    if (
      !placeStarting?.geometry?.location ||
      !placeDestination?.geometry?.location
    ) {
      return
    }

    const waypoints: google.maps.DirectionsWaypoint[] = []
    const directionsService = new google.maps.DirectionsService()

    let request: google.maps.DirectionsRequest = {
      origin: placeStarting.geometry.location,
      destination: placeDestination.geometry.location,
      travelMode: google.maps.TravelMode.DRIVING,
    }

    for (let i = 1; i < inputWaypoints.length - 1; i++) {
      const place = inputWaypoints[i]?.autocomplete?.getPlace()

      if (!place?.geometry?.location) continue

      waypoints.push({
        location: place.geometry.location,
        stopover: true,
      })
    }

    if (waypoints.length != 0) {
      request.waypoints = waypoints
    }

    directionsService.route(request, function (result, status) {
      if (status != 'OK' || result === null) {
        return
      }

      const legs = result.routes[0].legs

      $duration = 0
      $totalKilometres = 0

      legs.forEach((route) => {
        if (!route.duration?.value || !route.distance?.value) return

        $duration += Math.ceil(route.duration?.value / 60)
        $totalKilometres += Math.ceil(route.distance?.value / 1000)
      })

      if (roundTrip) {
        $duration *= 2
        $totalKilometres *= 2
      }
    })
  }

  let startingMarker: google.maps.marker.AdvancedMarkerElement
  function showStartingLocation() {
    const placeStarting = inputWaypoints[0].autocomplete.getPlace()

    if (!placeStarting?.geometry?.location) {
      return
    }

    if (startingMarker?.map) {
      startingMarker.map = null
    }

    startingMarker = new GoogleAdvancedMarkerElement({
      map: $map,
      position: placeStarting.geometry.location,
    })

    $map.panTo(placeStarting.geometry.location)
    $map.setZoom(15)
  }

  export let visible: boolean = false

  function addWaypoint() {
    if (inputWaypoints.length >= 5) return

    inputWaypoints.splice(-1, 0, { id: Date.now() + Math.random() })

    inputWaypoints = inputWaypoints
    calculateRoute(isRoundTrip)
  }

  function removeWaypoint(e) {
    if (inputWaypoints.length < 2) return

    inputWaypoints.splice(e.detail.index, 1)
    inputWaypoints = inputWaypoints
    calculateRoute(isRoundTrip)
  }

  function initAutocomplete(e) {
    inputWaypoints[e.detail.index].input = e.detail.input
    inputWaypoints[e.detail.index].autocomplete = new GoogleAutocomplete(
      e.detail.input,
      autocompleteOptions
    )

    if (e.detail.index === 0) {
      inputWaypoints[0].autocomplete.addListener(
        'place_changed',
        showStartingLocation
      )
    }

    inputWaypoints[e.detail.index].autocomplete.addListener(
      'place_changed',
      () => calculateRoute(isRoundTrip)
    )
  }

  $: calculateRoute(isRoundTrip)
</script>

<div class="mt-8" class:max-md:!block={visible} class:max-md:!hidden={!visible}>
  {#if GoogleAutocomplete}
    <div class="flex justify-between text-sm text-slate-600 transition-colors">
      <button
        on:click={addWaypoint}
        class="flex items-center gap-2 hover:text-slate-900 disabled:text-slate-400"
        disabled={inputWaypoints.length >= 5}
      >
        <PlusCircleIcon /> Add stop
      </button>

      <SwitchGroup
        class="relative flex items-center gap-2 hover:text-slate-900 "
      >
        <SwitchLabel>Round trip</SwitchLabel>
        <Switch
          checked={isRoundTrip}
          on:change={(e) => (isRoundTrip = e.detail)}
          class={`relative inline-flex h-6 w-11 items-center rounded-full 
            ${isRoundTrip ? 'bg-green-600' : 'bg-slate-200'}`}
        >
          <span
            class="inline-block h-4 w-4 rounded-full bg-white"
            class:translate-x-6={isRoundTrip}
            class:translate-x-1={!isRoundTrip}
          />
        </Switch>
      </SwitchGroup>
    </div>

    <ul class="mt-4 space-y-3 md:mt-3 md:space-y-2">
      {#each inputWaypoints as { id }, index (id)}
        <WaypointInput
          isFirst={index == 0}
          isLast={index == inputWaypoints.length - 1}
          {index}
          on:mounted={initAutocomplete}
          on:delete={removeWaypoint}
        />
      {/each}
    </ul>

    <p class="mt-8 text-center text-sm text-slate-600">
      {$days * 24 + $hours} hours and {$minutes} minutes<br />
      {$totalKilometres} kilometers
    </p>
  {:else}
    <div
      class="flex w-full justify-center rounded-md bg-slate-100 fill-slate-800 p-8"
    >
      <LoaderIcon class="h-5 w-5 animate-spin text-slate-500" />
    </div>
  {/if}
</div>
