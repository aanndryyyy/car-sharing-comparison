<script>
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from '@rgossiaux/svelte-headlessui'
  import { ChevronDown, Icon } from 'svelte-hero-icons'
</script>

<Menu class="relative">
  <MenuButton
    class="flex items-center gap-1 font-medium text-slate-700 transition-colors duration-75 hover:text-slate-900"
  >
    Cheapest first
    <Icon src={ChevronDown} size="20" />
  </MenuButton>
  <MenuItems
    class="absolute left-0 z-10 mt-2 whitespace-nowrap rounded-md bg-white py-1 font-medium text-slate-600 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    <MenuItem
      class="flex cursor-pointer gap-2 px-4 py-2 hover:bg-slate-100 hover:text-slate-900"
    >
      <a href="/account-settings">Cheapest first</a>
    </MenuItem>
    <MenuItem
      class="flex cursor-pointer gap-2 px-4 py-2 hover:bg-slate-100 hover:text-slate-900"
    >
      <a href="/documentation">Closest first</a>
    </MenuItem>
  </MenuItems>
</Menu>
