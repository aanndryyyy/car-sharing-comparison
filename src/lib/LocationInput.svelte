<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
  
  import { locationStore, updateLocation, type Location } from './Store/LocationStore';

  export let index: number;
  export let google: typeof globalThis.google;
  
  const dispatch = createEventDispatcher();
  let theInput: HTMLInputElement;

  const options = {
    fields: [ "name", "address_components", "geometry" ],
    strictBounds: false,
    componentRestrictions: { country: [ "ee", "fi", "lv", "lt" ] },
  };

	onMount( async () => {

    const autocomplete = new google.maps.places.Autocomplete( theInput, options);

    autocomplete.addListener( "place_changed", () => {

      let newLocation: Location = {
        id: index,
        place: null
      };
      
      const place = autocomplete.getPlace();

      if ( place.geometry !== undefined ) {
        newLocation.place = place;
      }

      updateLocation( newLocation );
      dispatch( 'placeChanged', { locations: $locationStore } );
    });
	});
</script>

<label class="block mb-4">

  <input
    bind:this={theInput}
    type=text 
    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
    placeholder="Start typing..."
  >
</label>