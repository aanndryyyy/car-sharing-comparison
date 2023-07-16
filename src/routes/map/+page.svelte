<script lang="ts">
  import { _ } from 'svelte-i18n'
  import {
    PUBLIC_BACKEND_BASE_URL,
    PUBLIC_GOOGLE_API_KEY,
  } from '$env/static/public'
  import CarsMap from '$lib/Components/CarsMap/CarsMap.svelte'
  import ManualPlanner from '$lib/Components/Planners/ManualPlanner.svelte'
  import AutoPlanner from '$lib/Components/Planners/TripPlanner.svelte'
  import CarList from '$lib/Components/Section/CarList/CarList.svelte'
  import BottomSheet from 'svelte-swipeable-sheets/BottomSheet.svelte'
  import { ArrowsUpDown, Funnel, Icon } from 'svelte-hero-icons'
  import { cars } from '../../lib/Store/Cars'
  import Filters from '$lib/Components/Filters.svelte'
  import SortSelection from '$lib/Components/Section/CarListControlsMobile/SortSelection.svelte'
  import BrandSelection from '$lib/Components/Section/CarListControlsMobile/BrandSelection.svelte'
  import { onMount } from 'svelte'
  import { invalidate } from '$app/navigation'
  import { map } from '../../lib/Store/GoogleMapStore'

  export let data
  $cars = data.cars

  let plannerType: boolean = false
  let open: boolean = false

  onMount(async () => {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary
    const interval = setInterval(() => {
      invalidate(PUBLIC_BACKEND_BASE_URL + 'location')
      $cars.forEach((c) => c.markers.forEach((m) => (m.map = null)))
      data.cars.forEach((c) => c.initialiseMarkers(AdvancedMarkerElement, $map))
      $cars = data.cars
    }, 60000)
    return () => clearInterval(interval)
  })

  async function openFilters(): Promise<void> {
    const growDiv = document.getElementById(`filters-grow`)
    if (growDiv.clientHeight) {
      growDiv.style.height = '0'
      growDiv.style.overflow = 'hidden'
    } else {
      const wrapper = document.getElementById(`filters-wrapper`)
      growDiv.style.height = wrapper.clientHeight + 'px'
      setTimeout(() => {
        growDiv.style.overflow = 'inherit'
      }, 500)
    }
  }
</script>

<svelte:head>
  {@html `<script>(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = \`https://maps.\$\{c\}apis.com/maps/api/js?\` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a); })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)); })({key: "${PUBLIC_GOOGLE_API_KEY}",v: "beta",});</script>`}
</svelte:head>

<main
  class="grid min-h-[calc(100vh-52px)] grid-rows-[1fr_5rem] md:min-h-fit md:grid-cols-[24rem_1fr] md:grid-rows-none"
>
  <aside
    class="-mt-16 hidden h-screen overflow-scroll pt-16 scrollbar-hide md:block md:w-96"
  >
    <div class="m-4 flex items-center justify-between">
      <h2 class="font-semibold">Planner</h2>

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
    <div class="m-4 mt-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-semibold">
            {$_('cars.title')}
          </h2>
        </div>

        <button
          on:click={openFilters}
          class="flex items-center justify-center gap-1.5 rounded bg-green-600 p-2.5 text-base font-medium text-white"
        >
          <Icon src={Funnel} size="24" />
        </button>
      </div>
      <div
        class="h-0 max-w-md overflow-hidden transition-[height] delay-100 duration-500 ease-in-out"
        id="filters-grow"
      >
        <div
          class="mt-4 grid gap-2 rounded-lg border border-slate-200 p-4"
          id="filters-wrapper"
        >
          <SortSelection />
          <BrandSelection grid={true} />
        </div>
      </div>

      <CarList />
    </div>
  </aside>

  <div class="grow bg-gray-300">
    <CarsMap zoom={13} class="h-full w-full" />
  </div>

  <button
    on:click={() => {
      open = true
    }}
    class="block h-20 p-4 md:hidden"
  >
    <div class="flex gap-4">
      <Icon src={Funnel} size="24" class="text-green-600" />
      <p>Filters</p>
    </div>
  </button>
</main>

<BottomSheet bind:open>
  <Filters bind:open />
</BottomSheet>

<style lang="postcss">
  :global(html),
  :global(body) {
    @apply h-full;
  }
</style>
