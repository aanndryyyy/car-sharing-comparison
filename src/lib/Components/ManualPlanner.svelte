<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { searchParamsObj } from '../Store/SearchParamsObj'
  import RangeSlider from 'svelte-range-slider-pips'

  // FIXME this is broken here. Should be okei after feature/search-update merge
  let duration = getDuration()

  function getDuration() {
    let tempDuration =
      $searchParamsObj.minutes +
      $searchParamsObj.hours * 60 +
      $searchParamsObj.days * 24 * 60
    return tempDuration
      ? Math.floor(Math.log(Math.ceil(tempDuration / 5) * 5) / Math.log(1.2))
      : 0
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
    let exponentialDuration = Math.pow(1.2, duration)
    exponentialDuration = Math.ceil(exponentialDuration / 5) * 5
    $searchParamsObj.minutes = exponentialDuration % 60
    $searchParamsObj.hours = Math.floor(exponentialDuration / 60) % 24
    $searchParamsObj.days = Math.floor(exponentialDuration / (60 * 24))
  }

  function removeLeadingZeros(e) {
    if (e.currentTarget.value && e.currentTarget.value[0] === '0')
      e.currentTarget.value = e.currentTarget.value.slice(1)
  }
</script>

<div>
  <div class="block mt-4">
    <div class="flex-row md:flex-col lg:flex-row flex gap-2">
      <div class="flex items-center rounded-md py-2 px-3 border">
        <input
          class="block w-full focus:outline-none"
          type="number"
          on:input={removeLeadingZeros}
          on:change={dateValueChanged}
          bind:value={$searchParamsObj.days}
          min="0"
        />
        <span class="text-sm font-bold text-gray-500">
          {$_('planner.input.short.day')}
        </span>
      </div>

      <div class="flex items-center rounded-md py-2 px-3 border">
        <input
          class="block w-full focus:outline-none"
          type="number"
          on:input={removeLeadingZeros}
          on:change={dateValueChanged}
          bind:value={$searchParamsObj.hours}
          min="0"
        />
        <span class="text-sm font-bold text-gray-500">
          {$_('planner.input.short.hour')}
        </span>
      </div>

      <div class="flex items-center rounded-md py-2 px-3 border">
        <input
          class="block w-full focus:outline-none"
          type="number"
          on:input={removeLeadingZeros}
          on:change={dateValueChanged}
          bind:value={$searchParamsObj.minutes}
          min="0"
        />
        <span class="text-sm font-bold text-gray-500">
          {$_('planner.input.short.minute')}
        </span>
      </div>
    </div>

    <RangeSlider
      range="min"
      min={0}
      max={50}
      bind:values={duration}
      on:change={durationValueChanged}
    />
  </div>

  <div class="block mt-8">
    <div class="flex items-center rounded-md py-2 px-3 border">
      <input
        class="block w-full focus:outline-none"
        type="number"
        bind:value={$searchParamsObj.distance}
        min="0"
      />
      <span class="text-sm font-bold text-gray-500"> KM </span>
    </div>

    <RangeSlider
      range="min"
      max={2500}
      bind:values={$searchParamsObj.distance}
    />
  </div>
</div>
