<script lang="ts">
  import CarsSection from '$lib/Components/Section/Cars.svelte'
  import PlannerSection from '$lib/Components/Section/Planner.svelte'
  import ogImage from '../assets/images/og-image.png'
  import { ArrowSmallRight, Icon, XMark } from 'svelte-hero-icons'
  import { _ } from 'svelte-i18n'
  import { Modal } from 'svelte-simple-modal'
  import Footer from '$lib/Components/Footer.svelte'

  let showAppShortDescription: boolean = true
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
