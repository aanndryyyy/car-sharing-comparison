<script lang="ts">
  import { carsFilter } from '$lib/Store/FilterStore'
  import { City } from '../../../Types/Enums/City'

  const citiesInfo: any = [
    { title: City.TALLINN, value: City.TALLINN },
    { title: City.TARTU, value: City.TARTU },
    { title: City.PÄRNU, value: City.PÄRNU },
  ]

  export let grid = false
</script>

<div class="space-y-1">
  <h4 class="text-base font-normal">Cities</h4>
  <div
    class="space-x-4 overflow-x-scroll whitespace-nowrap scrollbar-hide {grid
      ? 'contents'
      : ''}"
  >
    {#each citiesInfo as city}
      <div class="inline-block">
        <input
          type="checkbox"
          class="peer hidden"
          id={'city-' + city.title}
          value={city.value}
          bind:group={$carsFilter.cities}
        />
        <label
          class="block rounded border-2 p-1.5 {$carsFilter.cities.some(
            (p) => p === city.value
          )
            ? 'border-green-600 bg-green-200'
            : 'border-gray-200 bg-gray-200'}"
          for={'city-' + city.title}
        >
          {city.title}
        </label>
      </div>
    {/each}
  </div>
</div>
