import { writable } from 'svelte/store'
import { Provider } from '$lib/Types/Enums/Provider'
import { CarSortField } from '$lib/Types/Enums/CarSortField'
import { SortDirection } from '$lib/Types/Enums/SortDirection'

export type SortingSelection = {
  value: CarSortField
  direction: SortDirection
}

export type carsFilters = {
  providers: Provider[]
}

export const cheapestFirst = writable(true)

export const carsSort = writable<SortingSelection>({
  value: CarSortField.PRICE,
  direction: SortDirection.DESCENDING,
})

export const carsFilter = writable<carsFilters>({
  providers: [
    Provider.BOLT,
    Provider.CITYBEE,
    Provider.ELMO,
    Provider.BEAST,
    Provider.AVIS,
  ],
})
