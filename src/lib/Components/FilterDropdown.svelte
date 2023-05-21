<script lang="ts">
  import { clickOutside } from 'svelte-use-click-outside'
  import { Icon, ChevronDown } from 'svelte-hero-icons'
  import { cheapestFirst } from '$lib/Store/FilterStore'

  let showDropdown: boolean = false
  export let items = []
</script>

<div>
  <button
    class="flex items-center gap-1 font-medium text-slate-600"
    on:click={() => (showDropdown = !showDropdown)}
  >
    <p>
      {#if $cheapestFirst}
        Cheapest first
      {:else}
        Closest first
      {/if}
    </p>
    <Icon src={ChevronDown} size="20" />
  </button>

  {#if showDropdown}
    <div
      class="absolute z-10 grid gap-2 rounded border bg-white py-1 shadow-2xl"
      use:clickOutside={() => {
        showDropdown = false
      }}
    >
      <div
        class="flex cursor-pointer gap-2 px-4 py-2 hover:bg-slate-100"
        on:click={() => {
          $cheapestFirst = true
          showDropdown = false
        }}
      >
        <p>Cheapest first</p>
      </div>
      <div
        class="flex cursor-pointer gap-2 px-4 py-2 hover:bg-slate-100"
        on:click={() => {
          $cheapestFirst = false
          showDropdown = false
        }}
      >
        <p>Closest first</p>
      </div>
    </div>
  {/if}
</div>
