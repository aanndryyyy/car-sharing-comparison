<script lang="ts">
  import { duration } from '$lib/Store/DurationStore'
  import { totalKilometres } from '$lib/Store/TotalKilometresStore'
  import { MapContainer } from '$lib/Store/MapContainerStore';
  import Ellipsis2Vertical from '$lib/Icons/Ellipsis2Vertical.svelte'
  import XCircle from '$lib/Icons/Mini/XCircle.svelte'

  let startingLocationInput: HTMLInputElement;
  let startingLocationInputBlur: boolean;
  let destinationLocationInput: HTMLInputElement;
  let autocompleteStartingLocation: google.maps.places.Autocomplete;
  let autocompleteDestinationLocation: google.maps.places.Autocomplete;

  let map: google.maps.Map;
  let center: google.maps.LatLngLiteral = { lat: 59.437066, lng: 24.7509811 };
  let zoom = 12;

  const autocompleteOptions = {
    componentRestrictions: { country: "ee" },
    fields: [ "address_components", "geometry", "icon", "name" ],
    strictBounds: false,
    types: [ "address" ],
  };

  window.initMap = () => {
    
    map = new google.maps.Map(
      $MapContainer, 
      {
        zoom,
        center,
      }
    );

    autocompleteStartingLocation = new google.maps.places.Autocomplete(startingLocationInput,autocompleteOptions);
    autocompleteDestinationLocation = new google.maps.places.Autocomplete(destinationLocationInput,autocompleteOptions);

    autocompleteStartingLocation.addListener( "place_changed", calculateRoute );
    autocompleteDestinationLocation.addListener( "place_changed", calculateRoute );
  }

  function calculateRoute() {

    const placeStarting = autocompleteStartingLocation.getPlace();
    const placeDestination = autocompleteDestinationLocation.getPlace();

    if ( !placeStarting?.geometry?.location || !placeDestination?.geometry?.location ) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    const request:google.maps.DirectionsRequest = {
      origin: placeStarting.geometry.location,
      destination: placeDestination.geometry.location,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, function(result, status) {
      
      if (status != 'OK' || result === null ) {
        return;
      }

      const route = result.routes[0].legs[0];

      if ( !route.duration?.value || !route.distance?.value ) {
        return;
      }

      $duration = Math.ceil( route.duration?.value / 60 );
      $totalKilometres = Math.ceil( route.distance?.value / 1000 );

      console.log( route.duration?.text, route.duration?.value, $duration );
      console.log( route.distance?.text, route.distance?.value, $totalKilometres );
    });
  }
</script>

<svelte:head>
  <script defer async src="https://maps.googleapis.com/maps/api/js?key=&libraries=places&callback=initMap" />
</svelte:head>

<div class="space-y-4">

  <div class="flex items-center gap-1 rounded-md p-2 pl-4 border border-slate-900/20">
    <input
      type="text"
      bind:this={startingLocationInput}
      class="block w-full focus:outline-none"
      placeholder="Starting location"
    />
    <span class="flex items-center gap-1">
      <XCircle class="fill-slate-400" />
      <Ellipsis2Vertical class="fill-slate-400" />
    </span>
  </div>

  <div class="flex items-center rounded-md p-2 pl-4 border border-slate-900/20">
    <input
      type="text"
      bind:this={destinationLocationInput}
      class="block w-full focus:outline-none"
      placeholder="Destination"
    />
    <span>
      <Ellipsis2Vertical class="fill-slate-400" />
    </span>
  </div>
</div>
