<script lang="ts">
  export let text = ''
</script>

<div class="relative flex py-5 items-center">
  <div class="flex-grow border-t border-gray-400" />
  {#if text !== ''}
    <span class="flex-shrink mx-4 text-gray-400 font-bold">{text}</span>
    <div class="flex-grow border-t border-gray-400" />
  {/if}
</div>
