<script lang="ts">
  import { Icon, XMark } from 'svelte-hero-icons'
  import { _ } from 'svelte-i18n'
  import BrandSelection from './Section/CarListControlsMobile/BrandSelection.svelte'
  import SortSelection from './Section/CarListControlsMobile/SortSelection.svelte'

  export let open = false
</script>

<div class="grid gap-2 p-4">
  <div class="flex justify-between">
    <h3>
      {$_('filters')}
    </h3>

    {#if open}
      <button on:click={() => (open = false)}>
        <Icon src={XMark} size="24" />
      </button>
    {/if}
  </div>

  <SortSelection />
  <BrandSelection />
</div>
