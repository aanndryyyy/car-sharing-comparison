<script lang="ts">
  import { getContext } from 'svelte'
  import BrandMultiSelectDropdown from './BrandMultiSelectDropdown.svelte'
  const { open } = getContext('simple-modal')
  const showDropdown = () =>
    open(BrandMultiSelectDropdown, { message: "It's a modal!" })
</script>

<div>
  <button on:click={showDropdown}>Brands</button>
</div>
