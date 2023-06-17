<script lang="ts">
  import { _ } from 'svelte-i18n'
  import AutoPlanner from '$lib/Components/Planners/TripPlanner.svelte'
  import ManualPlanner from '$lib/Components/Planners/ManualPlanner.svelte'
  import { Icon, ArrowsUpDown } from 'svelte-hero-icons'

  let manualPlanner = true
  let screenSize: number
</script>

<svelte:window bind:innerWidth={screenSize} />

<aside class="md:col-span-1">
  <div class=" md:sticky md:top-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold md:text-3xl md:font-medium">
        {$_('planner.title')}
      </h2>

      <button
        class="flex items-center justify-center rounded bg-green-600 p-2.5 text-white md:hidden"
        on:click={() => (manualPlanner = !manualPlanner)}
      >
        <Icon src={ArrowsUpDown} size="24" />
      </button>
    </div>

    <div>
      <div class={manualPlanner ? 'block' : 'hidden'}>
        <ManualPlanner />
      </div>

      <div class="relative my-8 mt-10 flex items-center max-md:hidden">
        <div class="flex-grow border-t border-slate-300" />
        <span class="mx-4 flex-shrink font-bold text-slate-300">
          {$_('or').toUpperCase()}
        </span>
        <div class="flex-grow border-t border-slate-300" />
      </div>

      <div class={manualPlanner ? 'hidden' : 'block'}>
        <AutoPlanner />
      </div>
    </div>
  </div>
</aside>
