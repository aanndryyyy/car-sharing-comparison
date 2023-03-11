import { writable } from 'svelte/store';

interface Location {
  id: number;
  place: null|google.maps.places.PlaceResult;
}

const initialLocations: Location[] = [
  { id: 0, place: null },
  { id: 1, place: null },
  { id: 2, place: null },
];

const locationStore = writable(initialLocations);

function updateLocation( updatedLocation: Location ) {
  
  locationStore.update( locations => {

    let tempLocations = locations;
    const index = locations.findIndex( location => location.id === updatedLocation.id );

    if (index !== -1) {
      tempLocations.splice( index, 1, updatedLocation );
    }

    return tempLocations;
  });
}

export type { Location };
export { locationStore, updateLocation };