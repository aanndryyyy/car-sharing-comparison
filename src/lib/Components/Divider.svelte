<script lang="ts">
  export let text = ''
</script>

<div class="relative flex pb-2 items-center">
  <div class="flex-grow border-t border-slate-200" />
  {#if text !== ''}
    <span class="flex-shrink mx-4 text-gray-200 font-bold">{text}</span>
    <div class="flex-grow border-t border-gray-200" />
  {/if}
</div>
