<script>
  import { Provider } from '$lib/Types/Enums/Provider'
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from '@rgossiaux/svelte-headlessui'
  import { ChevronDown, Icon } from 'svelte-hero-icons'

  const brands = [
    { value: Provider.BOLT, title: 'Bolt', selected: true },
    { value: Provider.CITYBEE, title: 'CityBee', selected: true },
    { value: Provider.ELMO, title: 'Elmo', selected: true },
    { value: Provider.BEAST, title: 'Beast', selected: true },
    { value: Provider.AVIS, title: 'AVIS', selected: true },
  ]
</script>

<Popover class="relative px-4">
  <PopoverButton
    class="flex items-center gap-1 font-medium text-slate-700 transition-colors duration-75 hover:text-slate-900"
  >
    Brand
    <Icon src={ChevronDown} size="20" />
  </PopoverButton>

  <PopoverPanel
    class="absolute right-4 z-10 mt-2 w-36 whitespace-nowrap rounded-md bg-white py-1 font-medium text-slate-600 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    {#each brands as brand}
      <label
        class="flex gap-2 px-4 py-2 hover:bg-slate-100 hover:text-slate-900"
        for={brand.value}
      >
        <input
          type="checkbox"
          name="brands[]"
          id={brand.value}
          value={brand.value}
          checked={brand.selected}
        />
        {brand.title}
      </label>
    {/each}
  </PopoverPanel>
</Popover>
