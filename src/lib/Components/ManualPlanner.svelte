<script lang="ts">
  import { _ } from 'svelte-i18n'
  import RangeSlider from 'svelte-range-slider-pips'

  import { duration, minutes, hours, days } from '$lib/Store/DurationStore'
  import { totalKilometres } from '$lib/Store/TotalKilometresStore'

  function setManuallyMinutes(input: Event) {
    console.log('input', input)
    const target = input.target as HTMLInputElement
    let value = target.valueAsNumber

    if (isNaN(value)) {
      value = 0
    }

    $duration -= $minutes
    $duration += value
  }

  function setManuallyHours(input: Event) {
    console.log('input', input)
    const target = input.target as HTMLInputElement
    let value = target.valueAsNumber

    if (isNaN(value)) {
      value = 0
    }

    $duration -= $hours * 60
    $duration += value * 60
  }

  function setManuallyDays(input: Event) {
    console.log('input', input)
    const target = input.target as HTMLInputElement
    let value = target.valueAsNumber

    if (isNaN(value)) {
      value = 0
    }

    $duration -= $days * 24 * 60
    $duration += value * 24 * 60
  }

  $: inputMinutes = $minutes
  $: inputHours = $hours
  $: inputDays = $days
</script>

<div>
  <div class="block mt-4">
    <div class="flex-row md:flex-col lg:flex-row flex gap-2">
      <div class="flex items-center rounded-md py-2 px-3 border">
        <input
          class="block w-full focus:outline-none"
          type="number"
          bind:value={inputDays}
          on:change={setManuallyDays}
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
          bind:value={inputHours}
          on:change={setManuallyHours}
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
          bind:value={inputMinutes}
          on:change={setManuallyMinutes}
          min="0"
        />
        <span class="text-sm font-bold text-gray-500">
          {$_('planner.input.short.minute')}
        </span>
      </div>
    </div>

    <RangeSlider range="min" min={0} max={10000} bind:values={$duration} />
  </div>

  <div class="block mt-8">
    <div class="flex items-center rounded-md py-2 px-3 border">
      <input
        class="block w-full focus:outline-none"
        type="number"
        bind:value={$totalKilometres}
        min="0"
      />
      <span class="text-sm font-bold text-gray-500"> KM </span>
    </div>

    <RangeSlider range="min" max={2500} bind:values={$totalKilometres} />
  </div>
</div>
