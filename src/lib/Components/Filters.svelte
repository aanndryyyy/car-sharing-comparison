<script lang="ts">
  import { Icon, XMark } from 'svelte-hero-icons'
  import { _ } from 'svelte-i18n'
  import BrandSelection from './Section/CarListControlsMobile/BrandSelection.svelte'
  import SortSelection from './Section/CarListControlsMobile/SortSelection.svelte'

  export let open = false
</script>

<div class="space-y-4 p-4">
  <div class="flex justify-between">
    <h3>
      {$_('filters')}
    </h3>

    <button on:click={() => (open = false)}>
      <Icon src={XMark} size="24" />
    </button>
  </div>

  <SortSelection />
  <BrandSelection />
</div>
