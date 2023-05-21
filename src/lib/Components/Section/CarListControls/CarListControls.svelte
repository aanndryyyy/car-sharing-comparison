<script>
  import BrandDropdown from './BrandDropdown.svelte'
  import FuelDropdown from './FuelDropdown.svelte'
  import SortingDropdown from './SortingDropdown.svelte'
</script>

<div class="mt-12 hidden justify-between md:flex">
  <div class="flex">
    <SortingDropdown />
  </div>
  <div class="flex divide-x divide-slate-900/20">
    <BrandDropdown />
    <FuelDropdown />
  </div>
</div>
