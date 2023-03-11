<script lang="ts">
  import { _, locale, locales } from 'svelte-i18n';

  import type BaseCar from "$lib/Car/BaseCar";
  import type { PageData } from "./$types";
  import { duration } from "$lib/Store/DurationStore";
  import { totalKilometres } from "$lib/Store/TotalKilometresStore";

  import CarCard from "$lib/Components/CarCard.svelte";
  import CarsSection from "$lib/Components/CarsSection.svelte";
  import PlannerSection from "$lib/Components/PlannerSection.svelte";

  export let data: PageData;

  let allCars: BaseCar[] = [ ...data.boltCars, ...data.cityBeeCars, ...data.elmoCars, ...data.beastCars ];

  $: sortedCars = allCars.sort( function( car1: BaseCar, car2: BaseCar ) {
    let firstPer = car1.getTotalPrice( $duration, $totalKilometres );
    let secPer   = car2.getTotalPrice( $duration, $totalKilometres );

    return firstPer - secPer;
  });
</script>

<svelte:head>
  <title>{$_('title')}</title>
  <meta name="description" content="Effortlessly compare Bolt, CityBee, ELMO & Beast car sharing prices."/>

  <script defer data-domain="aanndryyyy.github.io/car-sharing-comparison" src="https://plausible.io/js/script.outbound-links.js"></script>
</svelte:head>

<header class="max-w-4xl mx-auto my-4 mb-16 lg:my-24 px-4 lg:px-0">
  <h1 class="mb-2 text-4xl md:text-5xl font-bold">{$_('title')}</h1>
  
  <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 min-w-[8rem] p-1 mr-2" bind:value={$locale}>
    {#each $locales as locale}
      <option value={locale}>{$_('locale.' + locale)}</option>
    {/each}
  </select>

  <small class="text-gray-500">
    By <a href="http://pedak.me" target="_blank" rel="noreferrer" class="hover:underline">Andry Pedak</a> | <a href="https://github.com/aanndryyyy/car-sharing-comparison" target="_blank" rel="noreferrer" class="hover:underline">GitHub</a>
  </small>
</header>

<main class="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto px-4 lg:px-0 my-4 mb-16 lg:my-8">
  <PlannerSection />

  <CarsSection>
    {#each sortedCars as genericCar, i }
      <CarCard car={genericCar} index={i} />
    {/each}
  </CarsSection>
</main>
