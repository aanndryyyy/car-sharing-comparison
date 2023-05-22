<script lang="ts">
  import { onMount } from 'svelte'
  import { duration, hours, minutes } from '$lib/Store/DurationStore'
  import { totalKilometres } from '$lib/Store/TotalKilometresStore'
  import { map } from '$lib/Store/GoogleMapStore'
  import { Loader } from '@googlemaps/js-api-loader'
  import { PUBLIC_GOOGLE_API_KEY } from '$env/static/public'
  import WaypointInput from './WaypointInput.svelte'
  import LoaderIcon from '$lib/Icons/Loader.svelte'

  import { Switch } from '@rgossiaux/svelte-headlessui'
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

  const loader = new Loader({
    apiKey: PUBLIC_GOOGLE_API_KEY,
    version: 'weekly',
  })

  onMount(async () => {
    loader.load().then(async () => {
      const { Autocomplete } = (await google.maps.importLibrary(
        'places'
      )) as google.maps.PlacesLibrary

      GoogleAutocomplete = Autocomplete

      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary

      GoogleAdvancedMarkerElement = AdvancedMarkerElement
    })
  })

  function calculateRoute() {
    const placeStarting = inputWaypoints[0].autocomplete.getPlace()
    const placeDestination = inputWaypoints.slice(-1)[0].autocomplete.getPlace()

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
    calculateRoute()
  }

  function removeWaypoint(e) {
    if (inputWaypoints.length < 2) return

    inputWaypoints.splice(e.detail.index, 1)
    inputWaypoints = inputWaypoints
    calculateRoute()
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
      calculateRoute
    )
  }
</script>

<div
  class={`space-y-4 ${$$props.class}`}
  class:max-md:!block={visible}
  class:max-md:!hidden={!visible}
>
  {#if GoogleAutocomplete}
    <div class="flex justify-between">
      <button
        on:click={addWaypoint}
        class="flex gap-2 text-slate-600 transition-colors hover:text-slate-900 disabled:text-slate-400"
        disabled={inputWaypoints.length >= 5}
      >
        <PlusCircleIcon /> Add stop</button
      >
      <Switch
        checked={isRoundTrip}
        on:change={(e) => (isRoundTrip = e.detail)}
        class={isRoundTrip ? 'switch switch-enabled' : 'switch switch-disabled'}
      >
        <span class="sr-only">Enable notifications</span>
        <span
          class="toggle"
          class:toggle-on={isRoundTrip}
          class:toggle-off={!isRoundTrip}
        />
      </Switch>
    </div>

    <ul class="space-y-4">
      {#each inputWaypoints as { id, input, autocomplete }, i (id)}
        <WaypointInput
          isFirst={i == 0}
          isLast={i == inputWaypoints.length - 1}
          index={i}
          {id}
          on:mounted={initAutocomplete}
          on:delete={removeWaypoint}
        />
      {/each}
    </ul>

    <p class="text-center text-sm text-slate-600">
      {$hours} hours and {$minutes} minutes<br />
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
