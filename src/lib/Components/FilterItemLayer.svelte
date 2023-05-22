<script lang="ts">
  export let onClick
  export let active: boolean
</script>

<div class="mt-1 flex gap-4 overflow-scroll scrollbar-hide">
  <button
    class="rounded border-2 bg-gray-200 px-2 py-1.5"
    style={active ? 'border-color: gray' : ''}
    on:click={onClick}
  >
    <slot />
  </button>
</div>
