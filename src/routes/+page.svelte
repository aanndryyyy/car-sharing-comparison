<script lang="ts">
  import { onMount } from "svelte";

  import { Loader } from "@googlemaps/js-api-loader";

  import type BaseCar from "$lib/BaseCar";
  import type { PageData } from "./$types";
  import LocationInput from "$lib/LocationInput.svelte";

  import { locationStore, type Location } from "$lib/Store/LocationStore";

  export let data: PageData;
  let allCars: BaseCar[] = [ ...data.boltCars, ...data.cityBeeCars, ...data.elmoCars, ...data.beastCars ];
  let google: typeof globalThis.google;

  const loader = new Loader({
    apiKey: "AIzaSyAXiIbtUl7ezyZZXCZH4BC5byCA_Ipw0xY",
    version: "weekly",
    libraries: ["places"],
  });

  onMount(async () => {
    loader.load().then((theGoogle) => {
      google = theGoogle;
    });
  });

  let totalMinutes = 86;
  let totalKilometres = 86;

  $: sortedCars = allCars.sort(function (car1: BaseCar, car2: BaseCar) {
    let firstPer = car1.getTotalPrice(totalMinutes, totalKilometres);
    let secPer = car2.getTotalPrice(totalMinutes, totalKilometres);

    return firstPer - secPer;
  });

  function placeChanged( event: CustomEvent<{locations: Location[]}> ) {

    let locations = event.detail.locations;
    
    if ( locations[0].place === null || locations[1].place === null ) {
      return null;
    }

    const directions     = new google.maps.DirectionsService();
    const origin         = locations[0];
    const lastValidPlace = locations.findIndex( location => location.place === null );
    const destination    = lastValidPlace >= 0 ? locations[lastValidPlace-1] : locations[locations.length-1];

    console.log( destination );
    

    if ( origin?.place?.geometry?.location === null || origin?.place?.geometry?.location === undefined  ) {
      return;
    }

    if ( destination?.place?.geometry?.location === null || destination?.place?.geometry?.location === undefined  ) {
      return;
    }

    const waypoints: google.maps.DirectionsWaypoint[] = locations
      .filter( (loc) => !!loc.place )
      .map(    (loc) => { return { location: loc?.place?.geometry?.location } as google.maps.DirectionsWaypoint } )
      .filter( (loc, i): loc is google.maps.DirectionsWaypoint => !!loc || i === 0 || i === locations.length-1 );

    const options: google.maps.DirectionsRequest = {
      origin: origin.place.geometry.location,
      waypoints,
      destination: destination.place.geometry.location,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: false,
    };

    directions.route( options, (response) => {
      console.log(response);

      var legs = response?.routes[0].legs;

      totalKilometres = 0;
      totalMinutes    = 0;

      for ( var j = 0; j < legs.length; j++ ) {
        
        var leg = legs[j];
        
        totalKilometres += leg.distance.value/1000;
        totalMinutes    += leg.duration.value/60;
      }
      
    });
  }
</script>

<main
  class="md:grid grid-cols-3 gap-16 max-w-6xl mx-auto px-4 lg:px-0 my-4 mb-16 lg:my-24"
>
  <aside class="col-span-1">
    <h1 class="text-3xl mb-8">Planning</h1>

    {#if google}
      {#each $locationStore as locationInput, i (locationInput.id)}
        <LocationInput google={google} on:placeChanged={placeChanged} index={i} />
      {/each}
    {/if}

    <p>Minutes: {totalMinutes}; Kilometers: {totalKilometres}</p>
  </aside>

  <section class="col-start-2 col-end-5">
    <h1 class="text-3xl mb-8">Cars</h1>

    {#each sortedCars as genericCar, i (genericCar)}
      <div
        class="flex justify-between items-center p-4 shadow-md rounded-md border border-gray-500 mb-4"
        class:border-green-600={i === 0}
        class:border-2={i === 0}
      >
        <div>
          <h2 class="font-semibold text-base">
            {genericCar.getName()}
          </h2>
          <!-- <p class="text-gray-500">&euro; {car.price.minute}/<span class="text-xs">min</span> | &euro; {car.price.km}/<span class="text-xs">km</span></p> -->
        </div>

        <div
          class="text-2xl font-bold text-right"
          class:text-green-600={i === 0}
        >
          {genericCar.getFormattedTotalPrice(totalMinutes, totalKilometres)}
        </div>
      </div>
    {/each}
  </section>
</main>
