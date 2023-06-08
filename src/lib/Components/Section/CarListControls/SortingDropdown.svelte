<script lang="ts">
  import { getPosition } from '../../../../helpers/position'
  import Loader from '../../../../assets/icons/loader.svg'
  import PersonWalkingIcon from '../../../../assets/icons/person-walking.svg'
  import { carsSort, type SortingSelection } from '$lib/Store/FilterStore'
  import { userPosition } from '$lib/Store/GoogleMapStore'
  import { CarSortField } from '$lib/Types/Enums/CarSortField'
  import { SortDirection } from '$lib/Types/Enums/SortDirection'
  import { Icon, CurrencyEuro, ChevronDown } from 'svelte-hero-icons'
  import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from '@rgossiaux/svelte-headlessui'

  let sortingOptions: SortingSelection[] = [
    {
      value: CarSortField.PRICE,
      direction: SortDirection.ASCENDING,
    },
    {
      value: CarSortField.DISTANCE,
      direction: SortDirection.ASCENDING,
    },
  ]

  function getSortingLabel(
    value: CarSortField,
    direction: SortDirection
  ): string {
    if (value === CarSortField.PRICE && direction === SortDirection.ASCENDING) {
      return 'Cheapest first'
    }
    if (
      value === CarSortField.PRICE &&
      direction === SortDirection.DESCENDING
    ) {
      return 'Expensive first'
    }
    if (
      value === CarSortField.DISTANCE &&
      direction === SortDirection.ASCENDING
    ) {
      return 'Closest first'
    }
    if (
      value === CarSortField.DISTANCE &&
      direction === SortDirection.DESCENDING
    ) {
      return 'Furthest first'
    }
    return 'No label'
  }

  async function setSortingOption(option: SortingSelection) {
    if (option.value === CarSortField.DISTANCE) {
      isLoading = true
      await getPosition()
        .then((position) => {
          $userPosition = position
        })
        .catch((err) => {
          alert('Failed to load location: ' + err)
        })
        .finally(() => {
          isLoading = false
        })
    }

    $carsSort = option
  }

  $: sortingLabel = getSortingLabel($carsSort.value, $carsSort.direction)
  let isLoading = false
</script>

<Menu class="relative text-sm">
  <MenuButton
    class="group flex items-center gap-1 font-medium text-slate-600 transition-colors duration-75 hover:text-slate-900"
  >
    {sortingLabel}
    <Icon
      src={ChevronDown}
      mini
      size="20"
      class="text-slate-400 transition-colors group-hover:text-slate-900 group-hover:transition-colors group-hover:duration-75"
    />
    {#if isLoading}
      <Loader class="h-5 w-5 animate-spin text-slate-500" />
    {/if}
  </MenuButton>
  <MenuItems
    class="absolute left-0 z-10 mt-2 whitespace-nowrap rounded-md bg-white py-1 font-medium text-slate-600 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    {#each sortingOptions as option}
      <MenuItem
        as="button"
        class={`group flex w-full cursor-pointer items-center gap-3 px-4 py-2 hover:bg-slate-100 hover:text-slate-900 ${
          $carsSort.value === option.value ? 'text-slate-900' : ''
        }`}
        on:click={() => setSortingOption(option)}
      >
        {#if option.value === CarSortField.DISTANCE}
          <PersonWalkingIcon class="h-5 w-5 group-hover:text-green-600" />
        {/if}
        {#if option.value === CarSortField.PRICE}
          <Icon
            src={CurrencyEuro}
            size="20"
            class="group-hover:text-green-600"
          />
        {/if}
        {getSortingLabel(option.value, option.direction)}
      </MenuItem>
    {/each}
  </MenuItems>
</Menu>
