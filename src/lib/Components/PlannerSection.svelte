<script lang="ts">
  import { _ } from 'svelte-i18n';

  import { duration, minutes, hours, days } from "$lib/Store/DurationStore";
  import {totalKilometres} from "$lib/Store/TotalKilometresStore.js";

  function setManuallyMinutes( input: Event ) {

    const target = input.target as HTMLInputElement;
    let value    = target.valueAsNumber;

    if ( isNaN( value ) ) {
      value = 0;
    }

    $duration -= $minutes;
    $duration += value;
  }

  function setManuallyHours( input: Event ) {

    console.log("input", input)
    const target = input.target as HTMLInputElement;
    let value    = target.valueAsNumber;

    if ( isNaN( value ) ) {
      value = 0;
    }

    $duration -= $hours*60;
    $duration += value*60;
  }

  function setManuallyDays( input: Event ) {

    const target = input.target as HTMLInputElement;
    let value    = target.valueAsNumber;

    if ( isNaN( value ) ) {
      value = 0;
    }

    $duration -= $days*24*60;
    $duration += value*24*60;
  }

  $: inputMinutes = $minutes;
  $: inputHours   = $hours;
  $: inputDays    = $days;

</script>

<aside class="md:col-span-1">
  <div class="md:sticky md:top-6">
    <div class="mb-6">
      <h2 class="text-2xl md:text-3xl">{$_('planner.title')}</h2>
      <small class="text-gray-500 mb-6">{$_('planner.subtitle')}</small>
    </div>

    <label class="block mb-6">

      <div class="flex-row md:flex-col lg:flex-row flex gap-2">

        <div class="relative">
          <input class="appearance-text block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number on:change={setManuallyDays} bind:value={inputDays} min=0>
          <span class="absolute leading-none text-gray-500 text-[10px] font-bold right-4 top-2/4 -translate-y-2/4">{$_('planner.input.day', { values: { count: $days } })}</span>
        </div>

        <div class="relative">
          <input class="appearance-text block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number on:change={setManuallyHours} bind:value={inputHours} min=0>
          <span class="absolute leading-none text-gray-500 text-[10px] font-bold right-4 top-2/4 -translate-y-2/4">{$_('planner.input.hour', { values: { count: $hours } })}</span>
        </div>

        <div class="relative">
          <input class="appearance-text block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number on:change={setManuallyMinutes} bind:value={inputMinutes} min=0>
          <span class="absolute leading-none text-gray-500 text-[10px] font-bold right-4 top-2/4 -translate-y-2/4">{$_('planner.input.minute', { values: { count: $minutes } })}</span>
        </div>
      </div>

      <input tabindex="-1" class="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer" type=range bind:value={$duration} min=0 max=10080>
    </label>

    <label class="block mb-8">

      <div class="relative">
        <input class="appearance-text block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number bind:value={$totalKilometres} min=0>
        <span class="absolute leading-none text-gray-500 text-[10px] font-bold right-4 top-2/4 -translate-y-2/4">KM</span>
      </div>

      <input tabindex="-1" class="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer" type=range bind:value={$totalKilometres} min=0 max=2500>
    </label>
  </div>
</aside>