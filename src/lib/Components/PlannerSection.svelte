<script lang="ts">
  import { _ } from 'svelte-i18n'
  import AutoPlanner from '$lib/Components/AutoPlanner.svelte'
  import ManualPlanner from '$lib/Components/ManualPlanner.svelte'
  import Divider from './Divider.svelte'
  import { Icon, ArrowsUpDown } from 'svelte-hero-icons'

  let manuelPlanner = true
  let screenSize
</script>

<svelte:window bind:innerWidth={screenSize} />
<aside class="md:col-span-1">
  <div class=" md:sticky md:top-6">
    <div class="flex justify-between">
      <h3>{$_('planner.title')}</h3>
      <button
        class="p-2.5 flex items-center justify-center rounded block md:hidden text-white bg-green-600"
        on:click={() => (manuelPlanner = !manuelPlanner)}
      >
        <Icon src={ArrowsUpDown} size="24" />
      </button>
    </div>

    <div>
      {#if manuelPlanner || screenSize >= 768}
        <ManualPlanner />
      {/if}
      {#if manuelPlanner && screenSize >= 768}
        <Divider text={$_('or').toUpperCase()} />
      {/if}
      {#if (screenSize < 768 && !manuelPlanner) || screenSize >= 768}
        <AutoPlanner />
      {/if}
    </div>
  </div>
</aside>
