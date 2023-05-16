<script lang="ts">
  import { _ } from 'svelte-i18n'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
  import AutoPlanner from '$lib/Components/AutoPlanner.svelte'
  import ManualPlanner from '$lib/Components/ManualPlanner.svelte'
  import Divider from './Divider.svelte'

  let manuelPlanner = true
  let screenSize
</script>

<svelte:window bind:innerWidth={screenSize} />
<aside class="md:col-span-1">
  <div class=" md:sticky md:top-6">
    <div class="flex justify-between">
      <h3>{$_('planner.title')}</h3>
      <button
        class="w-8 h-8 p-5 flex items-center justify-center border-2 border-green rounded block md:hidden"
        on:click={() => (manuelPlanner = !manuelPlanner)}
      >
        <Fa icon={faArrowRightArrowLeft} rotate={90} color="green" />
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
