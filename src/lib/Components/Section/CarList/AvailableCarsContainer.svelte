<script>
  import { Provider } from '$lib/Types/Enums/Provider'

  export let carsCount
  export let provider
</script>

<div class="flex">
  <div
    class="flex gap-2 rounded-2xl border border-yellow-500 bg-yellow-200 px-2 py-0.5"
  >
    <p>Available cars count:</p>
    {#if provider === Provider.BOLT || provider === Provider.CITYBEE}
      <p>{carsCount}</p>
    {:else}
      <p>Unknown</p>
    {/if}
  </div>
</div>
