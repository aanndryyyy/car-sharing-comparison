<script>
  import { Icon, ChevronDown } from 'svelte-hero-icons'
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from '@rgossiaux/svelte-headlessui'
  import { carsFilter } from '$lib/Store/FilterStore'

  let brandFilter = $carsFilter.providers
</script>

<Popover class="title relative px-4 text-sm">
  <PopoverButton
    class="group flex items-center gap-1 font-medium text-slate-600 transition-colors duration-75 hover:text-slate-900"
  >
    Brand
    <span class="inline-block h-5 w-5 rounded-md bg-slate-200"
      >{$carsFilter.providers.length}</span
    >
    <Icon
      src={ChevronDown}
      mini
      size="20"
      class="text-slate-400 transition-colors group-hover:text-slate-900 group-hover:transition-colors group-hover:duration-75"
    />
  </PopoverButton>

  <PopoverPanel
    class="absolute right-4 z-10 mt-2 w-36 whitespace-nowrap rounded-md bg-white py-1 font-medium text-slate-600 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    {#each brandFilter as item}
      <label
        class="flex items-center gap-3 px-4 py-2 capitalize hover:bg-slate-100 hover:text-slate-900"
      >
        <input
          type="checkbox"
          class="form-checkbox h-4 w-4 rounded border-slate-400 text-green-600 focus:ring-green-500"
          id={'provider-' + item.title}
          value={item}
          bind:group={$carsFilter.providers}
        />
        {item.title}
      </label>
    {/each}
  </PopoverPanel>
</Popover>
