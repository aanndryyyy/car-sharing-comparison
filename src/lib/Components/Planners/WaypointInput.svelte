<script lang="ts">
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import Ellipsis2Vertical from '$lib/Icons/Ellipsis2Vertical.svelte'

  onMount(async () => {
    
    dispatch( 'mounted', input );
  })

  let input: HTMLInputElement
</script>

<li
  class="group flex items-center rounded-md border border-slate-900/20 p-2 pl-4 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2"
  draggable="true"
>
  <input
    type="text"
    bind:this={input}
    class="block w-full outline-none"
    placeholder="Add stop"
  />
  <span>
    <Ellipsis2Vertical class="fill-slate-400 hover:cursor-grab" />
  </span>
</li>
