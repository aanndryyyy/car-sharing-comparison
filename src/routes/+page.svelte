<script lang="ts">
  import { _ } from 'svelte-i18n'

  import type BaseCar from '$lib/Car/BaseCar'
  import type { PageData } from './$types'

  import CarCard from '$lib/Components/CarCard.svelte'
  import CarsSection from '$lib/Components/CarsSection.svelte'
  import PlannerSection from '$lib/Components/PlannerSection.svelte'
  import { Icon, XMark, ArrowSmallRight } from 'svelte-hero-icons'
  import { fly } from 'svelte/transition'

  import ogImage from '$lib/Images/og-image.png'
  import sortCars from '../helpers/SortCars'
  import { CarSortField } from '../lib/Types/Enums/CarSortField'
  import { SortState } from '../lib/Types/Enums/SortState'
  import { days, duration, hours, minutes } from '../lib/Store/DurationStore'
  import { totalKilometres } from '../lib/Store/TotalKilometresStore'
  import { SearchParamsObj } from '../lib/DTO/SearchParamsObj'
  import { Modal } from 'svelte-simple-modal'

  export let data: PageData
  let showAppShortDescription: boolean = true

  let allCars: BaseCar[] = [
    ...data.boltCars,
    ...data.cityBeeCars,
    ...data.elmoCars,
    ...data.beastCars,
  ]

  function getSortedCars(duration, totalKilometres) {
    const searchParamsObj: SearchParamsObj = new SearchParamsObj()
    searchParamsObj.days = $days
    searchParamsObj.hours = $hours
    searchParamsObj.minutes = $minutes
    searchParamsObj.distance = totalKilometres

    allCars.forEach((car) => car.calculateRentTotalPrice(searchParamsObj))
    return sortCars(allCars, CarSortField.PRICE, SortState.UP)
  }

  $: sortedCars = getSortedCars($duration, $totalKilometres)
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

<header class="max-w-screen-lg mx-auto my-4 md:my-8 lg:my-16 px-4">
  <h1 class="mb-2 text-4xl md:text-5xl font-bold hidden md:block">
    {$_('title')}
  </h1>
  {#if showAppShortDescription}
    <div
      class="rounded-md bg-green-100 text-green-900 p-4 block md:hidden"
      transition:fly={{ duration: 2000 }}
    >
      <div class="flex">
        <p class="text-xs font-normal">
          {$_('appShortDescription')}.
        </p>
        <button
          class="flex w-16"
          on:click={() => (showAppShortDescription = false)}
        >
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
    class="max-w-screen-lg grid gap-8 md:grid-cols-3 mx-auto px-4 my-4 lg:my-8"
  >
    <PlannerSection />

    <CarsSection>
      {#each sortedCars as genericCar, i}
        <CarCard car={genericCar} index={i} />
      {/each}
    </CarsSection>
  </main>
</Modal>

<footer class="grid items-center justify-center p-4 mb-8">
  <p class="text-base text-gray-500">Copyright © 2023</p>
</footer>
