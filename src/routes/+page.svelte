<script lang="ts">
  import { _ } from 'svelte-i18n'

  import type BaseCar from '$lib/Car/BaseCar'
  import type { PageData } from './$types'
  import { searchParamsObj } from '$lib/Store/SearchParamsObj'

  import CarCard from '$lib/Components/CarCard.svelte'
  import CarsSection from '$lib/Components/CarsSection.svelte'
  import PlannerSection from '$lib/Components/PlannerSection.svelte'

  import ogImage from '$lib/Images/og-image.png'
  import sortCars from '../helpers/SortCars'
  import { CarSortField } from '../lib/Types/Enums/CarSortField'
  import { SortState } from '../lib/Types/Enums/SortState'
  import { Modal } from 'svelte-simple-modal'

  export let data: PageData

  let allCars: BaseCar[] = [
    ...data.boltCars,
    ...data.cityBeeCars,
    ...data.elmoCars,
    ...data.beastCars,
  ]

  function getSortedCars(searchParamsObj) {
    allCars.forEach((car) => car.calculateRentTotalPrice(searchParamsObj))
    return sortCars(allCars, CarSortField.PRICE, SortState.UP)
  }

  $: sortedCars = getSortedCars($searchParamsObj)
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
  <div
    class="border-2 border-gray-200 rounded bg-gray-100 p-4 text-base block md:hidden"
  >
    {$_('appShortDescription')}.
  </div>
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

<footer class="grid items-center justify-center p-4">
  <p class="text-base text-gray-500">Copyright © 2023</p>
</footer>
