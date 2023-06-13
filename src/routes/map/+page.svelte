<script lang="ts">
  import { PUBLIC_GOOGLE_API_KEY } from '$env/static/public'
  import CarsMap from '$lib/Components/CarsMap/CarsMap.svelte'
  import ManualPlanner from '$lib/Components/Planners/ManualPlanner.svelte'
  import AutoPlanner from '$lib/Components/Planners/TripPlanner.svelte'
  import { ArrowsUpDown, Icon } from 'svelte-hero-icons'
  import { cars } from '../../lib/Store/Cars'
  import Filters from '$lib/Components/Filters.svelte'

  export let data
  $cars = data.cars

  let plannerType: boolean = false
</script>

<svelte:head>
  {@html `<script>(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = \`https://maps.\$\{c\}apis.com/maps/api/js?\` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a); })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)); })({key: "${PUBLIC_GOOGLE_API_KEY}",v: "beta",});</script>`}
</svelte:head>

<main
  class="grid min-h-full grid-rows-[1fr_5rem] md:grid-cols-[24rem_1fr] md:grid-rows-none"
>
  <aside class="hidden md:block md:w-96">
    <div class="m-4 flex items-center justify-between">
      <h2 class="text-2xl font-semibold md:text-3xl md:font-medium">Planner</h2>

      <button
        class="flex items-center justify-center rounded bg-green-600 p-2.5 text-white"
        on:click={() => (plannerType = !plannerType)}
      >
        <Icon src={ArrowsUpDown} size="24" />
      </button>
    </div>

    <div class="px-4">
      <div class:hidden={plannerType}>
        <ManualPlanner />
      </div>
      <div class:hidden={!plannerType}>
        <AutoPlanner />
      </div>
    </div>
  </aside>

  <div class="grow bg-gray-300">
    <CarsMap zoom={13} class="h-full w-full" />
  </div>

  <aside class="block h-20 md:hidden">
    <Filters />
  </aside>
</main>

<style lang="postcss">
  :global(html),
  :global(body) {
    @apply h-full;
  }
</style>
