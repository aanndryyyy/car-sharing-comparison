<script lang="ts">
  import ChevronDownIcon from '$lib/Icons/Mini/ChevronDownIcon.svelte'
  import { carsSort, type SortingSelection } from '$lib/Store/FilterStore'
  import { CarSortField } from '$lib/Types/Enums/CarSortField'
  import { SortDirection } from '$lib/Types/Enums/SortDirection'
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from '@rgossiaux/svelte-headlessui'

  const sortingOptions: SortingSelection[] = [
    {
      value: CarSortField.PRICE,
      direction: SortDirection.DESCENDING,
    },
    {
      value: CarSortField.DISTANCE,
      direction: SortDirection.DESCENDING,
    },
  ]

  const sortingLabels = [
    { [(CarSortField.PRICE, SortDirection.ASCENDING)]: 'Cheapest first' },
    { [(CarSortField.PRICE, SortDirection.DESCENDING)]: 'Expensive first' },
    { [(CarSortField.DISTANCE, SortDirection.ASCENDING)]: 'Closest first' },
    { [(CarSortField.DISTANCE, SortDirection.DESCENDING)]: 'Furthest first' },
  ]

  function getSortingLabel(
    value: CarSortField,
    direction: SortDirection
  ): string {
    // TODO: Sorting label logic
    return 'Cheapest first'
  }

  $: sortingLabel = getSortingLabel($carsSort.value, $carsSort.direction)
</script>

<Menu class="relative text-sm">
  <MenuButton
    class="group flex items-center gap-1 font-medium text-slate-600 transition-colors duration-75 hover:text-slate-900"
  >
    {sortingLabel}
    <ChevronDownIcon
      class="text-slate-400 transition-colors group-hover:text-slate-900 group-hover:transition-colors group-hover:duration-75"
    />
  </MenuButton>
  <MenuItems
    class="absolute left-0 z-10 mt-2 whitespace-nowrap rounded-md bg-white py-1 font-medium text-slate-600 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    {#each sortingOptions as option}
      <MenuItem
        class={`flex cursor-pointer gap-2 px-4 py-2 hover:bg-slate-100 hover:text-slate-900 ${
          $carsSort.value === option.value ? 'text-slate-900' : ''
        }`}
      >
        <button on:click={() => ($carsSort = option)}>
          {getSortingLabel(option.value, option.direction)}
        </button>
      </MenuItem>
    {/each}
  </MenuItems>
</Menu>
