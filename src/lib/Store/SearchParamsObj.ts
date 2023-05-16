import { writable } from 'svelte/store'
import { SearchParamsObj } from '../DTO/SearchParamsObj'

export const searchParamsObj = writable(new SearchParamsObj())
