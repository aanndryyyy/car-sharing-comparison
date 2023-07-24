<script>
  import BrandDropdown from './ProviderDropdown.svelte'
  import FuelDropdown from './MotorTypeDropdown.svelte'
  import SortingDropdown from './SortingDropdown.svelte'
  import CityDropdown from '$lib/Components/Section/CarListControls/CityDropdown.svelte'
</script>

<div class="mt-12 hidden justify-between md:flex">
  <div class="flex">
    <SortingDropdown />
  </div>
  <div class="flex divide-x divide-slate-900/20">
    <BrandDropdown />
    <CityDropdown />
    <FuelDropdown />
  </div>
</div>
