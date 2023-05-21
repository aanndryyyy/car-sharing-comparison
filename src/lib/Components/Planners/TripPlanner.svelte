<script lang="ts">
  import { onMount } from 'svelte'
  import { duration, hours, minutes } from '$lib/Store/DurationStore'
  import { totalKilometres } from '$lib/Store/TotalKilometresStore'
  import { map } from '$lib/Store/GoogleMapStore'
  import { Loader } from '@googlemaps/js-api-loader'
  import { PUBLIC_GOOGLE_API_KEY } from '$env/static/public'
  import Ellipsis2Vertical from '$lib/Icons/Ellipsis2Vertical.svelte'
  import XCircle from '$lib/Icons/Mini/XCircle.svelte'
  import WaypointInput from './WaypointInput.svelte'

  let startingLocationInput: HTMLInputElement
  let destinationLocationInput: HTMLInputElement
  let autocompleteStartingLocation: google.maps.places.Autocomplete
  let autocompleteDestinationLocation: google.maps.places.Autocomplete

  let initAutocomplete: CallableFunction;
  let inputWaypoints: {
    id: number
    input?: HTMLInputElement
    autocomplete?: google.maps.places.Autocomplete
  }[] = []

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

      autocompleteStartingLocation = new Autocomplete(
        startingLocationInput,
        autocompleteOptions
      )
      autocompleteDestinationLocation = new Autocomplete(
        destinationLocationInput,
        autocompleteOptions
      )

      autocompleteStartingLocation.addListener('place_changed', calculateRoute)
      autocompleteStartingLocation.addListener(
        'place_changed',
        showStartingLocation
      )
      autocompleteDestinationLocation.addListener(
        'place_changed',
        calculateRoute
      )


      initAutocomplete = ( e ) => {
        console.log(e.detail);

        new Autocomplete(
          e.detail,
          autocompleteOptions
        )
      }
    })
  })

  function calculateRoute() {
    const placeStarting = autocompleteStartingLocation.getPlace()
    const placeDestination = autocompleteDestinationLocation.getPlace()

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

    inputWaypoints.forEach( waypoint => {
      const place = waypoint?.autocomplete?.getPlace();

      if (!place?.geometry?.location) return;

      waypoints.push({
        location: place.geometry.location,
        stopover: true,
      })
    })

    if ( waypoints.length != 0 ) {
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
    const placeStarting = autocompleteStartingLocation.getPlace()

    if (!placeStarting?.geometry?.location) {
      return
    }

    $map.panTo(placeStarting.geometry.location)
    $map.setZoom(16)
  }

  export let visible: boolean = false

  function addWaypoint() {
    if (inputWaypoints.length >= 5) return

    inputWaypoints = inputWaypoints.concat({
      id: (inputWaypoints.slice(-1)[0]?.id || 0) + 1,
    })
  }
</script>

<div
  class={`space-y-4 ${$$props.class}`}
  class:max-md:!block={visible}
  class:max-md:!hidden={!visible}
>
  <button on:click={addWaypoint}>Add stop</button>

  <ul class="space-y-4">
    <li
      class="flex items-center gap-1 rounded-md border border-slate-900/20 p-2 pl-4 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2"
    >
      <input
        type="text"
        bind:this={startingLocationInput}
        class="block w-full outline-none"
        placeholder="Starting location"
      />
      <span class="flex items-center gap-1">
        <XCircle class="fill-slate-400" />
        <Ellipsis2Vertical class="fill-slate-400" />
      </span>
    </li>

    {#each inputWaypoints as { input, autocomplete }, i}
      <WaypointInput on:mounted={initAutocomplete} />
    {/each}

    <li
      class="group flex items-center rounded-md border border-slate-900/20 p-2 pl-4 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2"
    >
      <input
        type="text"
        bind:this={destinationLocationInput}
        class="block w-full outline-none"
        placeholder="Destination"
      />
      <span>
        <Ellipsis2Vertical class="fill-slate-400" />
      </span>
    </li>
  </ul>

  <p class="text-center text-sm text-slate-600">
    {$hours} hours and {$minutes} minutes<br />
    {$totalKilometres} kilometers
  </p>
</div>
