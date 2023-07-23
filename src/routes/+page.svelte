<script lang="ts">
  import { PUBLIC_GOOGLE_API_KEY } from '$env/static/public'
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
  import CarsSection from '$lib/Components/Section/Cars.svelte'
  import PlannerSection from '$lib/Components/Section/Planner.svelte'
  import ogImage from '../assets/images/og-image.png'
  import { cars } from '$lib/Store/Cars'
  import { ArrowSmallRight, Icon, XMark } from 'svelte-hero-icons'
  import { _ } from 'svelte-i18n'
  import { Modal } from 'svelte-simple-modal'
  import Footer from '$lib/Components/Footer.svelte'
  import { onMount } from 'svelte'
  import { invalidate } from '$app/navigation'
  import { map } from '../lib/Store/GoogleMapStore'

  let showAppShortDescription: boolean = true

  export let data
  $cars = data.cars

  onMount(async () => {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary
    const interval = setInterval(() => {
      invalidate(PUBLIC_BACKEND_BASE_URL + 'location')
      $cars.forEach((car) =>
        car.markers.forEach((marker) => {
          marker.map = null
        })
      )
      data.cars.forEach((car) =>
        car.initialiseMarkers(AdvancedMarkerElement, $map)
      )
      $cars = data.cars
    }, 60000)
    return () => clearInterval(interval)
  })
</script>

<svelte:head>
  <title>{$_('title')}</title>
  <meta
    name="description"
    content="Effortlessly compare Bolt, CityBee, ELMO & Beast car sharing prices."
  />

  <meta property="og:image" content={ogImage} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:card" content="summary_large_image" />

  {@html `<script>(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = \`https://maps.\$\{c\}apis.com/maps/api/js?\` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a); })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)); })({key: "${PUBLIC_GOOGLE_API_KEY}",v: "beta",});</script>`}
</svelte:head>

<header class="mx-auto my-4 max-w-screen-lg px-4 md:my-8 lg:my-12">
  {#if showAppShortDescription}
    <div class="block rounded-md bg-green-100 p-4 text-green-900 md:hidden">
      <div class="flex justify-between">
        <p class="text-xs font-normal">
          {$_('appShortDescription')}.
        </p>
        <button class="flex" on:click={() => (showAppShortDescription = false)}>
          <Icon class="text-green-600" src={XMark} size="24" />
        </button>
      </div>
      <a
        href="/about-us"
        class="flex items-center gap-1 pt-2 text-xs font-medium"
      >
        <p>
          {$_('readMore')}
        </p>
        <Icon src={ArrowSmallRight} size="12" />
      </a>
    </div>
  {/if}
</header>

<Modal>
  <main
    class="mx-auto my-4 grid max-w-screen-lg gap-8 px-4 md:grid-cols-3 lg:my-8"
  >
    <PlannerSection />

    <CarsSection />
  </main>
</Modal>

<Footer />
