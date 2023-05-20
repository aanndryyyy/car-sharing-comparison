<script lang="ts">
  import { _ } from 'svelte-i18n'
  import AutoPlanner from '$lib/Components/AutoPlanner.svelte'
  import ManualPlanner from '$lib/Components/ManualPlanner.svelte'
  import Divider from './Divider.svelte'
  import { Icon, ArrowsUpDown } from 'svelte-hero-icons'

  let manualPlanner = true
  let screenSize: number
</script>

<svelte:window bind:innerWidth={screenSize} />

<aside class="md:col-span-1">
  <div class=" md:sticky md:top-6">
    <div class="flex justify-between">
      <h3>{$_('planner.title')}</h3>
      <button
        class="flex items-center justify-center rounded bg-green-600 p-2.5 text-white md:hidden"
        on:click={() => (manualPlanner = !manualPlanner)}
      >
        <Icon src={ArrowsUpDown} size="24" />
      </button>
    </div>

    <div>
      <ManualPlanner visible={manualPlanner} />

      <div class="relative my-8 flex items-center max-md:hidden">
        <div class="flex-grow border-t border-slate-300" />
        <span class="mx-4 flex-shrink font-bold text-slate-300">
          {$_('or').toUpperCase()}
        </span>
        <div class="flex-grow border-t border-slate-300" />
      </div>

      <AutoPlanner visible={!manualPlanner} class="max-md:hidden" />
    </div>
  </div>
</aside>

<style lang="postcss">
  :global(.rangeSlider) {
    margin: 16px 0 !important;
  }
  :global(.rangeSlider > .rangeBar) {
    background: #4ade80 !important;
  }
  :global(.rangeNub) {
    background: #16a34a !important;
  }
</style>
