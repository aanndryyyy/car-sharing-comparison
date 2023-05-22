<script>
  import ChevronDownIcon from '$lib/Icons/Mini/ChevronDownIcon.svelte'
  import { CarSortField } from '$lib/Types/Enums/CarSortField'
  import { SortState } from '$lib/Types/Enums/SortState'
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from '@rgossiaux/svelte-headlessui'

  let items = [
    { value: CarSortField.PRICE, title: 'Cheapest first' },
    { value: CarSortField.CLOSEST, title: 'Closest first' },
  ]

  let selectedItem = items[0]
</script>

<Menu class="relative text-sm">
  <MenuButton
    class="group flex items-center gap-1 font-medium text-slate-600 transition-colors duration-75 hover:text-slate-900"
  >
    {selectedItem.title}
    <ChevronDownIcon
      class="text-slate-400 transition-colors group-hover:text-slate-900 group-hover:transition-colors group-hover:duration-75"
    />
  </MenuButton>
  <MenuItems
    class="absolute left-0 z-10 mt-2 whitespace-nowrap rounded-md bg-white py-1 font-medium text-slate-600 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    {#each items as item}
      <MenuItem
        class={`flex cursor-pointer gap-2 px-4 py-2 hover:bg-slate-100 hover:text-slate-900 ${
          selectedItem === item ? 'text-slate-900' : ''
        }`}
      >
        <button on:click={() => (selectedItem = item)}>{item.title}</button>
      </MenuItem>
    {/each}
  </MenuItems>
</Menu>
