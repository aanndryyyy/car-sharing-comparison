<script lang="ts">
  import type BaseCar from "$lib/Car/BaseCar";
  import type { PageData } from "./$types";
  import { breakdownMinutes, formatDuration } from "$lib/Time";

  export let data: PageData;

  let totalDurationInMinutes = 86;
  let totalKilometres        = 86;

  let allCars: BaseCar[] = [ ...data.boltCars, ...data.cityBeeCars, ...data.elmoCars, ...data.beastCars ];

  $: sortedCars = allCars.sort( function( car1: BaseCar, car2: BaseCar ) {
    let firstPer = car1.getTotalPrice( totalDurationInMinutes, totalKilometres );
    let secPer   = car2.getTotalPrice( totalDurationInMinutes, totalKilometres );

    return firstPer - secPer;
  });

  $: totalMinutes = breakdownMinutes( totalDurationInMinutes ).minutes;
  $: totalHours   = breakdownMinutes( totalDurationInMinutes ).hours;
  $: totalDays    = breakdownMinutes( totalDurationInMinutes ).days || 0;

  function setManuallyMinutes( input: Event ) {

    const target = input.target as HTMLInputElement;
    let value    = target.valueAsNumber;
    
    if ( isNaN( value ) ) {
      value = 0;
    }
    
    totalDurationInMinutes -= breakdownMinutes( totalDurationInMinutes ).minutes;
    totalDurationInMinutes += value;
  }

  function setManuallyHours( input: Event ) {

    const target = input.target as HTMLInputElement;
    let value    = target.valueAsNumber;
    
    if ( isNaN( value ) ) {
      value = 0;
    }
    
    totalDurationInMinutes -= breakdownMinutes( totalDurationInMinutes ).hours*60;
    totalDurationInMinutes += value*60;
  }

  function setManuallyDays( input: Event ) {

    const target = input.target as HTMLInputElement;
    let value    = target.valueAsNumber;
    
    if ( isNaN( value ) ) {
      value = 0;
    }
    
    totalDurationInMinutes -= breakdownMinutes( totalDurationInMinutes ).days*24*60;
    totalDurationInMinutes += value*24*60;
  }
</script>

<svelte:head>
  <title>Car Sharing Comparison</title>
  <meta name="description" content="Effortlessly compare Bolt, CityBee, ELMO & Beast car sharing prices."/>

  <script defer data-domain="aanndryyyy.github.io/car-sharing-comparison" src="https://plausible.io/js/script.outbound-links.js"></script>
</svelte:head>

<header class="max-w-4xl mx-auto my-4 mb-16 lg:my-24">
  <h1 class="mb-2 text-5xl font-bold">Car Sharing Comparison</h1>
  
  <small class="text-gray-500">
    By <a href="http://pedak.me" target="_blank" rel="noreferrer" class="hover:underline">Andry Pedak</a> | <a href="https://github.com/aanndryyyy/car-sharing-comparison" target="_blank" rel="noreferrer" class="hover:underline">GitHub</a>
  </small>
</header>

<main class="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto px-4 lg:px-0 my-4 mb-16 lg:my-8">

  <aside class="md:col-span-1">
    <div class="mb-6">
      <h2 class="text-3xl">Planner</h2>
    
      <small class="text-gray-500 mb-6">
        Use sliders or enter manually
      </small>
    </div>

    <label class="block mb-6">
      <span class="block mb-2">Duration</span>

      <div class="flex-col sm:flex-row flex gap-2">
        
        <div class="relative">
          <input class="appearance-text block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number on:change={setManuallyDays} bind:value={totalDays} min=0>
          <span class="absolute leading-none text-gray-500 text-[10px] font-bold right-4 top-2/4 -translate-y-2/4">{ totalDays === 1 ? 'DAY' : 'DAYS' }</span>
        </div>
        
        <div class="relative">
          <input class="appearance-text block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number on:change={setManuallyHours} bind:value={totalHours} min=0>
          <span class="absolute leading-none text-gray-500 text-[10px] font-bold right-4 top-2/4 -translate-y-2/4">{ totalHours === 1 ? 'HOUR' : 'HRS' }</span>
        </div>
        
        <div class="relative">
          <input class="appearance-text block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number on:change={setManuallyMinutes} bind:value={totalMinutes} min=0>
          <span class="absolute leading-none text-gray-500 text-[10px] font-bold right-4 top-2/4 -translate-y-2/4">{ totalMinutes === 1 ? 'MIN' : 'MINS' }</span>
        </div>
      </div>

      <input tabindex="-1" class="w-full h-2 bg-green-600 rounded-lg appearance-none cursor-pointer" type=range bind:value={totalDurationInMinutes} min=0 max=10080>
    </label>
    
    <label class="block mb-8">
      <span class="block mb-2">Kilometres</span>

      <div class="relative">
        <input class="appearance-text block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number bind:value={totalKilometres} min=0>
        <span class="absolute leading-none text-gray-500 text-[10px] font-bold right-4 top-2/4 -translate-y-2/4">KM</span>
      </div>

      <input tabindex="-1" class="w-full h-2 bg-green-600 rounded-lg appearance-none cursor-pointer" type=range bind:value={totalKilometres} min=0 max=2500>
    </label>
  </aside>

  <section class="md:col-start-2 md:col-end-4">
  
    <div class="mb-6">
      <h2 class="text-3xl">Cars</h2>

      <small class="text-gray-500">
        Prices don't match? <a href="https://github.com/aanndryyyy/car-sharing-comparison/blob/main/README.md#data-scraping" target="_blank" rel="noreferrer" class="underline">Contribute</a>
      </small>
    </div>

    <div class="grid gap-4 auto-cols-fr">
      {#each sortedCars as genericCar, i }
        <div class="flex justify-between items-center p-4 shadow-md rounded-md border border-gray-500" class:border-green-600={i === 0} class:border-2={i === 0}>
          
          <div>
            <h2 class="font-semibold text-base mb-2">{genericCar.getName()}</h2>
            <div class="flex align-center text-xs text-gray-600">
              <img class="inline h-4 pr-4" src={genericCar.getLogo()} alt="Provider Logo">
              {genericCar.getFormattedMinutePrice()} | {genericCar.getFormattedKilometrePrice()}
            </div>
          </div>
    
          <div class="text-2xl font-bold text-right" class:text-green-600={i === 0}>
            {genericCar.getFormattedTotalPrice(totalDurationInMinutes, totalKilometres)}
            <span class="block text-xs font-normal text-blue-600" title="Long-term rent discount">{genericCar.getFormattedLongTermDiscount(totalDurationInMinutes, totalKilometres)}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>
</main>
