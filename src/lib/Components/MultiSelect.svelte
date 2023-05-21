<script lang="ts">
  import { clickOutside } from 'svelte-use-click-outside'
  import { Icon, ChevronDown } from 'svelte-hero-icons'

  let showDropdown: boolean = false
  export let name: String = ''
  export let items = []

  $: selectedItemsCount = items.filter((i) => i.selected).length
</script>

<div>
  <button
    class="flex items-center gap-1 text-sm font-medium text-slate-600"
    on:click={() => (showDropdown = !showDropdown)}
  >
    <p>
      {name}
    </p>
    {#if selectedItemsCount > 0}
      <div class="h-4 w-4 rounded bg-slate-300">
        <p class="text-xs font-medium">
          {selectedItemsCount}
        </p>
      </div>
    {/if}
    <Icon src={ChevronDown} size="20" />
  </button>

  {#if showDropdown}
    <div
      class="absolute grid w-36 gap-2 rounded border bg-white p-2"
      use:clickOutside={() => {
        showDropdown = false
      }}
    >
      {#each items as item}
        <div
          class="flex gap-2"
          on:click={() => (item.selected = !item.selected)}
        >
          <input type="checkbox" bind:checked={item.selected} />
          <p class="cursor-pointer">
            {item.value}
          </p>
        </div>
      {/each}
    </div>
  {/if}
</div>
