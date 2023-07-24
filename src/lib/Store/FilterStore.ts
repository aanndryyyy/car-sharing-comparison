import { writable } from 'svelte/store'
import { Provider } from '$lib/Types/Enums/Provider'
import { CarSortField } from '$lib/Types/Enums/CarSortField'
import { SortDirection } from '$lib/Types/Enums/SortDirection'
import { MotorType } from '../Types/Enums/MotorType'

export type SortingSelection = {
  value: CarSortField
  direction: SortDirection
}

export const carsSort = writable<SortingSelection>({
  value: CarSortField.PRICE,
  direction: SortDirection.ASCENDING,
})

export type Item<T> = { value: T; title: string }

export type carsFilters = {
  providers: Item<Provider>[]
  motorTypes: Item<MotorType>[]
}

export const carsFilter = writable<carsFilters>({
  providers: [
    { value: Provider.BOLT, title: 'Bolt' },
    { value: Provider.CITYBEE, title: 'CityBee' },
    { value: Provider.ELMO, title: 'Elmo' },
    { value: Provider.BEAST, title: 'Beast' },
    { value: Provider.AVIS, title: 'Avis' },
  ],
  motorTypes: [
    { value: MotorType.ELECTRIC, title: 'Electric' },
    { value: MotorType.PETROL, title: 'Petrol' },
    { value: MotorType.DIESEL, title: 'Diesel' },
  ],
})
