import { derived, writable } from 'svelte/store'
import { Provider } from '$lib/Types/Enums/Provider'

export type carsFilters = {
  providers: Provider[]
}

export const cheapestFirst = writable(true)

export const carsFilter = writable<carsFilters>({
  providers: [
    Provider.BOLT,
    Provider.CITYBEE,
    Provider.ELMO,
    Provider.BEAST,
    Provider.AVIS,
  ],
})
