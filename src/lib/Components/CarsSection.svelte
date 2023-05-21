<script lang="ts">
  import { _ } from 'svelte-i18n'
  import BottomSheet from 'svelte-swipeable-sheets/BottomSheet.svelte'
  import CarsMap from './CarsMap/CarsMap.svelte'
  import { getContext } from 'svelte'
  import Filters from '$lib/Components/Filters.svelte'
  import { Icon, Funnel, Map } from 'svelte-hero-icons'
  import MultiSelect from './MultiSelect.svelte'
  import { Provider } from '../Types/Enums/Provider'
  import { MotorType } from '../Types/Enums/MotorType'
  import FilterDropdown from './FilterDropdown.svelte'
  import { cheapestFirst } from '$lib/Store/FilterStore'
  import CarList from './Section/CarList/CarList.svelte'
  const modal = getContext('simple-modal')

  const openMap = () => modal.open(CarsMap)
  let open: boolean = false
  let filtersOpen: boolean = false

  const brands = [
    { value: Provider.BOLT, selected: true },
    { value: Provider.CITYBEE, selected: true },
    { value: Provider.ELMO, selected: true },
    { value: Provider.BEAST, selected: true },
    { value: Provider.AVIS, selected: true },
  ]

  const types = [
    // {value: CarBo, selected: true},
  ]

  const fuels = [
    { value: MotorType.ELECTRIC, selected: true },
    { value: MotorType.PETROL, selected: true },
    { value: MotorType.DIESEL, selected: true },
  ]
</script>

<section class="md:col-start-2 md:col-end-4">
  <div class="flex items-center justify-between">
    <div>
      <h3>{$_('cars.title')}</h3>
      <button
        class="mt-2 block flex gap-1 text-green-600 md:hidden"
        on:click={() => (open = true)}
      >
        <Icon src={Funnel} size="16" />
        <p class="text-xs font-medium">Sort & Filters</p>
      </button>
    </div>

    <button
      class="block flex items-center justify-center gap-1.5 rounded bg-green-600 px-3 py-2 text-white md:hidden"
      on:click={openMap}
    >
      <p class="text-base font-medium">Map</p>
      <Icon src={Map} size="24" />
    </button>
  </div>

  <div class="mt-4 hidden md:block">
    <CarsMap />

    <BottomSheet bind:open={filtersOpen}>
      <Filters bind:open={filtersOpen} />
    </BottomSheet>
  </div>

  <div class="mt-8 flex justify-between md:flex">
    <div class="flex">
      <div
        class="flex gap-px overflow-hidden rounded-md bg-gray-400 p-px text-sm font-medium hover:cursor-pointer"
      >
        <div
          class="rounded-bl-md rounded-tl-md bg-white p-1"
          style={$cheapestFirst ? 'background: #e2e8f0' : 'background: white'}
          on:click={() => ($cheapestFirst = true)}
        >
          Cheapest first
        </div>
        <div
          class="rounded-br-md rounded-tr-md bg-white p-1"
          style={$cheapestFirst ? 'background: white' : 'background: #e2e8f0'}
          on:click={() => ($cheapestFirst = false)}
        >
          Closest first
        </div>
      </div>

      <FilterDropdown />
    </div>
    <div class="flex gap-4">
      <MultiSelect name="Brand" items={brands} />
      <MultiSelect name="Type" items={types} />
      <MultiSelect name="Fuel" items={fuels} />
    </div>
  </div>

  <CarList />
</section>

<BottomSheet bind:open>
  <Filters bind:open />
</BottomSheet>
