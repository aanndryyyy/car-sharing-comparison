<script lang="ts">
  import { getPosition } from '../../../../helpers/position'
  import Loader from '../../../../assets/icons/loader.svg'
  import PersonWalkingIcon from '../../../../assets/icons/person-walking.svg'
  import { carsSort, type SortingSelection } from '$lib/Store/FilterStore'
  import { userPosition } from '$lib/Store/GoogleMapStore'
  import { CarSortField } from '$lib/Types/Enums/CarSortField'
  import { SortDirection } from '$lib/Types/Enums/SortDirection'
  import { Icon, CurrencyEuro } from 'svelte-hero-icons'

  async function setSortingOption(option: SortingSelection) {
    if (option.value === CarSortField.DISTANCE) {
      isLoading = true
      await getPosition()
        .then((position) => {
          $userPosition = position
        })
        .catch((err: Error) => {
          alert(
            err.message +
              '\n\nFailed to load location! Make sure that the browser has the right to share your location!'
          )
        })
        .finally(() => {
          isLoading = false
        })
    }

    $carsSort = option
  }

  let isLoading = false
  $: sortByPrice =
    $carsSort.value === CarSortField.PRICE &&
    $carsSort.direction === SortDirection.ASCENDING
  $: sortByDistance =
    $carsSort.value === CarSortField.DISTANCE &&
    $carsSort.direction === SortDirection.ASCENDING
</script>

<div class="space-y-1">
  <h4 class="flex items-center gap-2 text-base font-normal">
    Sorting
    {#if isLoading}
      <Loader class="h-4 w-4 animate-spin text-slate-500" />
    {/if}
  </h4>
  <div class="flex gap-4 overflow-x-scroll whitespace-nowrap scrollbar-hide">
    <button
      class="flex items-center gap-2 rounded border-2 p-1.5 {sortByPrice
        ? 'border-green-600 bg-green-200'
        : 'border-gray-200 bg-gray-200'}"
      on:click={() =>
        setSortingOption({
          value: CarSortField.PRICE,
          direction: SortDirection.ASCENDING,
        })}
    >
      <PersonWalkingIcon class="group-hover:text-green-600" />
      Cheapest first
    </button>
    <button
      class="flex items-center gap-2 rounded border-2 p-1.5 {sortByDistance
        ? 'border-green-600 bg-green-200'
        : 'border-gray-200 bg-gray-200'}"
      on:click={() =>
        setSortingOption({
          value: CarSortField.DISTANCE,
          direction: SortDirection.ASCENDING,
        })}
    >
      <Icon src={CurrencyEuro} size="20" class="group-hover:text-green-600" />
      Closest first
    </button>
  </div>
</div>
