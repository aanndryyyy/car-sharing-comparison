<script lang="ts">
  import { map } from '$lib/Store/GoogleMapStore'

  import MinusIcon from '$lib/Icons/Mini/MinusIcon.svelte'
  import PlusIcon from '$lib/Icons/Mini/PlusIcon.svelte'
</script>

<div
  class="absolute bottom-7 right-4 flex flex-col items-center justify-center rounded-md bg-white px-0.5 py-0 shadow-lg shadow-black/20"
>
  <button
    on:click={() => $map.setZoom($map.getZoom() + 1)}
    class="flex h-8 w-7 items-center justify-center border-b border-slate-200 fill-slate-600 transition-[fill] hover:fill-green-600"
  >
    <PlusIcon />
  </button>
  <button
    on:click={() => $map.setZoom($map.getZoom() - 1)}
    class="flex h-8 w-7 items-center justify-center fill-slate-600 transition-[fill] hover:fill-green-600"
  >
    <MinusIcon />
  </button>
</div>
