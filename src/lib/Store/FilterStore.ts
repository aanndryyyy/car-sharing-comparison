import { derived, writable } from 'svelte/store'

export const cheapestFirst = writable(true)
export const carsFilter = writable({
  provider: {
    BOLT: false,
    CITYBEE: false,
    ELMO: false,
    BEAST: false,
    AVIS: false,
  },
})

export const filterSelectedProvidersCount = derived(
  carsFilter,
  ($carsFilter) =>
    Object.keys($carsFilter.provider).filter((p) => $carsFilter.provider[p])
      .length
)
