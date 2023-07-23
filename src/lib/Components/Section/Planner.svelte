<script lang="ts">
  import { _ } from 'svelte-i18n'
  import AutoPlanner from '$lib/Components/Planners/TripPlanner.svelte'
  import ManualPlanner from '$lib/Components/Planners/ManualPlanner.svelte'
  import { Icon, ArrowsUpDown } from 'svelte-hero-icons'
  import App_logo from '../../../assets/images/app-logo.png'

  let autoPlanner = true
  let screenSize: number
</script>

<svelte:window bind:innerWidth={screenSize} />

<aside class="md:col-span-1">
  <div class=" md:sticky md:top-6">
    <div>
      <img class="hidden md:block" src={App_logo} alt="Rentalize logo" />
      <h1 class="my-2 hidden text-2xl font-light md:block">
        {$_('title')}
      </h1>
    </div>

    <div class="mt-8 flex items-center justify-between">
      <h2 class="text-2xl font-semibold md:text-3xl md:font-medium">
        {$_('planner.title')}
      </h2>

      <button
        class="flex items-center justify-center rounded bg-green-600 p-2.5 text-white md:hidden"
        on:click={() => (autoPlanner = !autoPlanner)}
      >
        <Icon src={ArrowsUpDown} size="24" />
      </button>
    </div>

    <div>
      <div class={autoPlanner ? 'block' : 'hidden'}>
        <AutoPlanner />
      </div>

      <div class="relative my-8 mt-10 flex items-center max-md:hidden">
        <div class="flex-grow border-t border-slate-300" />
        <span class="mx-4 flex-shrink font-bold text-slate-300">
          {$_('or').toUpperCase()}
        </span>
        <div class="flex-grow border-t border-slate-300" />
      </div>

      <div class={autoPlanner && screenSize < 768 ? 'hidden' : 'block'}>
        <ManualPlanner />
      </div>
    </div>
  </div>
</aside>
