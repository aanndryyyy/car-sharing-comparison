import { writable } from 'svelte/store'
import { Provider } from '$lib/Types/Enums/Provider'
import { CarSortField } from '$lib/Types/Enums/CarSortField'
import { SortDirection } from '$lib/Types/Enums/SortDirection'
import { MotorType } from '../Types/Enums/MotorType'
import { City } from '../Types/Enums/City'

export type SortingSelection = {
  value: CarSortField
  direction: SortDirection
}

export const carsSort = writable<SortingSelection>({
  value: CarSortField.PRICE,
  direction: SortDirection.ASCENDING,
})

export type carsFilters = {
  providers: Provider[]
  motorTypes: MotorType[]
  cities: City[]
}

export const carsFilter = writable<carsFilters>({
  providers: [
    Provider.BOLT,
    Provider.CITYBEE,
    Provider.ELMO,
    Provider.BEAST,
    Provider.AVIS,
  ],
  motorTypes: [MotorType.ELECTRIC, MotorType.PETROL, MotorType.DIESEL],
  cities: [City.TALLINN, City.TARTU],
})
