<script lang="ts">
  import { onMount } from 'svelte'
  import { duration, hours, minutes } from '$lib/Store/DurationStore'
  import { totalKilometres } from '$lib/Store/TotalKilometresStore'
  import { map } from '$lib/Store/GoogleMapStore'
  import { Loader } from '@googlemaps/js-api-loader'
  import { PUBLIC_GOOGLE_API_KEY } from '$env/static/public'
  import WaypointInput from './WaypointInput.svelte'

  let GoogleAutocomplete: typeof google.maps.places.Autocomplete
  let inputWaypoints: {
    input?: HTMLInputElement
    autocomplete?: google.maps.places.Autocomplete
  }[] = [{}, {}]

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

      if (!place?.geometry?.location) return

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
        if (!route.duration?.value || !route.distance?.value) {
          return
        }

        $duration += Math.ceil(route.duration?.value / 60)
        $totalKilometres += Math.ceil(route.distance?.value / 1000)
      })
    })
  }

  function showStartingLocation() {
    const placeStarting = inputWaypoints[0].autocomplete.getPlace()

    if (!placeStarting?.geometry?.location) {
      return
    }

    $map.panTo(placeStarting.geometry.location)
    $map.setZoom(15)
  }

  export let visible: boolean = false

  function addWaypoint() {
    if (inputWaypoints.length >= 5) return

    inputWaypoints.push({})

    console.log(inputWaypoints)

    inputWaypoints = inputWaypoints
  }

  function initAutocomplete(e) {
    console.log(e.detail)

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
    <button on:click={addWaypoint}>Add stop</button>

    <ul class="space-y-4">
      {#each inputWaypoints as { input, autocomplete }, i }
        <WaypointInput isFirst={i==0} isLast={i==(inputWaypoints.length-1)} index={i} on:mounted={initAutocomplete} />
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
      <svg
        class="h-5 w-5 animate-spin text-slate-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  {/if}
</div>
