<script lang="ts">
  import { _ } from 'svelte-i18n'
  import CarsSection from '$lib/Components/CarsSection.svelte'
  import PlannerSection from '$lib/Components/PlannerSection.svelte'
  import { Icon, XMark, ArrowSmallRight } from 'svelte-hero-icons'
  import { cars } from '$lib/Store/Cars'

  import ogImage from '$lib/Images/og-image.png'
  import { Modal } from 'svelte-simple-modal'
  import type { Car } from '$lib/Car/GenericCar'

  let showAppShortDescription: boolean = true

  /** @type {import('./$types').PageData} */
  export let data: { cars: Car[] }
  $cars = data.cars
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

  <script
    defer
    data-domain="aanndryyyy.github.io/car-sharing-comparison"
    src="https://plausible.io/js/script.outbound-links.js"
  ></script>
</svelte:head>

<header class="mx-auto my-4 max-w-screen-lg px-4 md:my-8 lg:my-32">
  <h1 class="mb-2 hidden text-5xl font-semibold md:block">
    {$_('title')}
  </h1>

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
      <button class="flex items-center gap-1 pt-2 text-xs font-medium">
        <p>
          {$_('readMore')}
        </p>
        <Icon src={ArrowSmallRight} size="12" />
      </button>
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

<footer class="mb-8 grid items-center justify-center p-4">
  <p class="text-base text-gray-500">Copyright © 2023</p>
</footer>
