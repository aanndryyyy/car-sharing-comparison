<script>
  import { MotorType } from '$lib/Types/Enums/MotorType'
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from '@rgossiaux/svelte-headlessui'
  import { ChevronDown, Icon } from 'svelte-hero-icons'

  const items = [
    { value: MotorType.ELECTRIC, title: 'Electric', selected: true },
    { value: MotorType.PETROL, title: 'Petrol', selected: true },
    { value: MotorType.DIESEL, title: 'Diesel', selected: true },
  ]
</script>

<Popover class="relative px-4 pr-0">
  <PopoverButton
    class="flex items-center gap-1 font-medium text-slate-700 transition-colors duration-75 hover:text-slate-900"
  >
    Fuel
    <Icon src={ChevronDown} size="20" />
  </PopoverButton>

  <PopoverPanel
    class="absolute right-0 z-10 mt-2 w-36 whitespace-nowrap rounded-md bg-white py-1 font-medium text-slate-600 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    {#each items as brand}
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
