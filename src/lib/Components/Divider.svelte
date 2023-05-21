<script lang="ts">
  export let text = ''
</script>

<div class="relative flex items-center pb-2">
  <div class="flex-grow border-t border-slate-200" />
  {#if text !== ''}
    <span class="mx-4 flex-shrink font-bold text-gray-200">{text}</span>
    <div class="flex-grow border-t border-gray-200" />
  {/if}
</div>
