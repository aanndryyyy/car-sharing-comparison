<script lang="ts">
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  import { Icon, XMark, EllipsisVertical } from 'svelte-hero-icons'

  onMount(async () => {
    dispatch('mounted', { index, input })
  })

  export let index: number
  export let isFirst: boolean
  export let isLast: boolean
  let input: HTMLInputElement

  let placeholder: string = 'Add stop'

  if (isFirst) {
    placeholder = 'Starting location'
  }

  if (isLast) {
    placeholder = 'Destination'
  }
</script>

<li
  class="flex items-center gap-2"
  class:pr-1={!isFirst && !isLast}
  draggable="true"
>
  <div
    class="flex grow items-center rounded-md border border-slate-900/20 p-2 pl-4 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2"
  >
    <input
      type="text"
      bind:this={input}
      class="block w-full outline-none"
      {placeholder}
    />
    <span class="hidden">
      <Icon
        src={EllipsisVertical}
        size="24"
        class="text-slate-400 hover:cursor-grab"
      />
    </span>
  </div>

  {#if !isFirst && !isLast}
    <button on:click={() => dispatch('delete', { index })}>
      <Icon src={XMark} size="24" class="text-red-600" />
    </button>
  {/if}
</li>
