import { writable } from 'svelte/store'

export const map = writable<google.maps.Map>()
export const userPosition = writable<GeolocationPosition>()
