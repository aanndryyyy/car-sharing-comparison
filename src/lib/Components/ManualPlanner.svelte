<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { searchParamsObj } from '../Store/SearchParamsObj'

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
      <div class="flex items-center rounded py-3 px-4 bg-gray-200">
        <input
          class="block w-full bg-gray-200 focus:outline-none"
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

      <div class="flex items-center rounded py-3 px-4 bg-gray-200">
        <input
          class="block w-full bg-gray-200 focus:outline-none"
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

      <div class="flex items-center rounded py-3 px-4 bg-gray-200">
        <input
          class="block w-full bg-gray-200 focus:outline-none"
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

    <input
      tabindex="-1"
      class="w-full mt-3"
      type="range"
      on:change={durationValueChanged}
      bind:value={duration}
      min="0"
      max="50"
    />
  </div>

  <div class="block mt-4">
    <div class="flex items-center rounded py-3 px-4 bg-gray-200">
      <input
        class="block w-full bg-gray-200 focus:outline-none"
        type="number"
        bind:value={$searchParamsObj.distance}
        min="0"
      />
      <span class="text-sm font-bold text-gray-500"> KM </span>
    </div>

    <input
      tabindex="-1"
      type="range"
      class="w-full mt-3"
      bind:value={$searchParamsObj.distance}
      min="0"
      max="2500"
    />
  </div>
</div>
