<script lang="ts">
  import type BaseCar from "$lib/BaseCar";
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

  $: formattedDuration = formatDuration(totalDurationInMinutes);

  $: totalMinutes = breakdownMinutes( totalDurationInMinutes ).minutes;
  $: totalHours   = breakdownMinutes( totalDurationInMinutes ).hours;
  $: totalDays    = breakdownMinutes( totalDurationInMinutes ).days;
</script>

<header class="max-w-4xl mx-auto my-4 mb-16 lg:mt-24">
  <h1 class="mb-2 text-5xl font-bold">Car Sharing Comparison</h1>
  
  <small class="text-gray-500">
    By <a href="http://pedak.me" target="_blank" rel="noreferrer" class="hover:underline">Andry Pedak</a> | <a href="https://github.com/aanndryyyy/bolt-calculator" target="_blank" rel="noreferrer" class="hover:underline">GitHub</a>
  </small>
</header>

<main class="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto px-4 lg:px-0 my-4 mb-16 lg:my-8">

  <aside class="md:col-span-1">
    <h2 class="text-3xl mb-6">Planner</h2>

    <label class="block mb-4">
      <div class="flex-col sm:flex-row flex gap-2">
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number bind:value={totalDays} min=0 max=99 pattern="[0-9]">
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number bind:value={totalHours} min=0 max=99 pattern="[0-9]">
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number bind:value={totalMinutes} min=0 max=99 pattern="[0-9]">
        <!-- <input class="appearance-none block w-full disabled:bg-gray-200 disabled:text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=text bind:value={formattedDuration} min=0 disabled> -->
      </div>
      <input tabindex="-1" class="w-full h-2 bg-green-600 rounded-lg appearance-none cursor-pointer" type=range bind:value={totalDurationInMinutes} min=0 max=4320>
    </label>
    
    <label class="block mb-8">
      <span class="block mb-1">Kilometres</span>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number bind:value={totalKilometres} min=0>
      <input tabindex="-1" class="w-full h-2 bg-green-600 rounded-lg appearance-none cursor-pointer" type=range bind:value={totalKilometres} min=0 max=360>
    </label>
  </aside>

  <section class="md:col-start-2 md:col-end-4">
  
    <div class="mb-6">
      <h2 class="text-3xl">Cars</h2>

      <small class="text-gray-500">
        Prices don't match? <a href="https://github.com/aanndryyyy/bolt-calculator/blob/main/src/cars.ts" target="_blank" rel="noreferrer" class="underline">Contribute</a>
      </small>
    </div>

    <div class="grid gap-4 auto-cols-fr">
      {#each sortedCars as genericCar, i }
        <div class="flex justify-between items-center p-4 shadow-md rounded-md border border-gray-500" class:border-green-600={i === 0} class:border-2={i === 0}>
          <div>
            <h2 class="font-semibold text-base">{genericCar.getName()}</h2>
            <!-- <p class="text-gray-500">&euro; {car.price.minute}/<span class="text-xs">min</span> | &euro; {car.price.km}/<span class="text-xs">km</span></p> -->
          </div>
    
          <div class="text-2xl font-bold text-right" class:text-green-600={i === 0}>
            {genericCar.getFormattedTotalPrice(totalDurationInMinutes, totalKilometres)}
            <!-- <span class="block text-xs font-normal text-blue-600" title="Long-term rent discount">{get_discount_total(totalMinutes, car).toFixed(0)}&euro;</span> -->
          </div>
        </div>
      {/each}
    </div>
  </section>
</main>
