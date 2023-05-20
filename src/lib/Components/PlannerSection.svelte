<script lang="ts">
  import { _ } from 'svelte-i18n';

  import { searchParamsObj } from "$lib/Store/SearchParamsObj";

  let duration = getDuration()

  function getDuration() {
    return $searchParamsObj.minutes + $searchParamsObj.hours * 60 + $searchParamsObj.days * 24 * 60;
  }

  function dateValueChanged() {
    duration = getDuration()
    if ($searchParamsObj.minutes == undefined) {
      $searchParamsObj.minutes = 0
    } else if ($searchParamsObj.hours == undefined) {
      $searchParamsObj.hours = 0
    } else if ($searchParamsObj.days == undefined) {
      $searchParamsObj.days = 0
    }
  }

  function durationValueChanged() {
    $searchParamsObj.minutes = duration % 60
    $searchParamsObj.hours = Math.floor( duration / 60 ) % 24
    $searchParamsObj.days = Math.floor( duration / ( 60 * 24 ) )
  }

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
          <input class="appearance-text block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number on:change={dateValueChanged} bind:value={$searchParamsObj.days} min=0>
          <span class="absolute leading-none text-gray-500 text-[10px] font-bold right-4 top-2/4 -translate-y-2/4">{$_('planner.input.day', { values: { count: $searchParamsObj.days } })}</span>
        </div>

        <div class="relative">
          <input class="appearance-text block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number on:change={dateValueChanged} bind:value={$searchParamsObj.hours} min=0>
          <span class="absolute leading-none text-gray-500 text-[10px] font-bold right-4 top-2/4 -translate-y-2/4">{$_('planner.input.hour', { values: { count: $searchParamsObj.hours } })}</span>
        </div>

        <div class="relative">
          <input class="appearance-text block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number on:change={dateValueChanged} bind:value={$searchParamsObj.minutes} min=0>
          <span class="absolute leading-none text-gray-500 text-[10px] font-bold right-4 top-2/4 -translate-y-2/4">{$_('planner.input.minute', { values: { count: $searchParamsObj.minutes } })}</span>
        </div>
      </div>

      <input tabindex="-1" class="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer" type=range on:change={durationValueChanged} bind:value={duration} min=0 max=10080>
    </label>

    <label class="block mb-8">

      <div class="relative">
        <input class="appearance-text block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type=number bind:value={$searchParamsObj.distance} min=0>
        <span class="absolute leading-none text-gray-500 text-[10px] font-bold right-4 top-2/4 -translate-y-2/4">KM</span>
      </div>

      <input tabindex="-1" class="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer" type=range bind:value={$searchParamsObj.distance} min=0 max=2500>
    </label>
  </div>
</aside>