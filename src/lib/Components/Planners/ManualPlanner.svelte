<script lang="ts">
  import { _ } from 'svelte-i18n'
  import RangeSlider from 'svelte-range-slider-pips'

  import { duration, minutes, hours, days } from '$lib/Store/DurationStore'
  import { totalKilometres } from '$lib/Store/TotalKilometresStore'

  function setManuallyMinutes(input: Event) {
    const target = input.target as HTMLInputElement
    let value = target.valueAsNumber

    if (isNaN(value)) {
      value = 0
    }

    $duration -= $minutes
    $duration += value
  }

  function setManuallyHours(input: Event) {
    const target = input.target as HTMLInputElement
    let value = target.valueAsNumber

    if (isNaN(value)) {
      value = 0
    }

    $duration -= $hours * 60
    $duration += value * 60
  }

  function setManuallyDays(input: Event) {
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
  $: inputDuration = [$duration]
  $: inputTotalKilometres = [$totalKilometres]

  function setDuration(input: CustomEvent) {
    duration.set(input.detail.value)
  }

  function setTotalKilometres(input: CustomEvent) {
    totalKilometres.set(input.detail.value)
  }

  export let visible: boolean = false
</script>

<div
  class={$$props.class}
  class:max-md:!block={visible}
  class:max-md:!hidden={!visible}
>
  <div class="mt-4 block">
    <div class="flex flex-row gap-2 md:flex-col lg:flex-row">
      <div
        class="flex items-center rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-1"
      >
        <input
          class="appearance-text block w-full focus:outline-none"
          type="number"
          bind:value={inputDays}
          on:change={setManuallyDays}
          min="0"
          id="days"
        />
        <label class="text-sm font-bold text-gray-500" for="days">
          {$_('planner.input.short.day')}
        </label>
      </div>

      <div
        class="flex items-center rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-1"
      >
        <input
          class="appearance-text block w-full focus:outline-none"
          type="number"
          bind:value={inputHours}
          on:change={setManuallyHours}
          min="0"
          id="hours"
        />
        <label class="text-sm font-bold text-gray-500" for="hours">
          {$_('planner.input.short.hour')}
        </label>
      </div>

      <div
        class="flex items-center rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-1"
      >
        <input
          class="appearance-text block w-full focus:outline-none"
          type="number"
          bind:value={inputMinutes}
          on:change={setManuallyMinutes}
          min="0"
          id="minutes"
        />
        <label class="text-sm font-bold text-gray-500" for="minutes">
          {$_('planner.input.short.minute')}
        </label>
      </div>
    </div>

    <RangeSlider
      range="min"
      min={0}
      max={10000}
      bind:values={inputDuration}
      on:change={setDuration}
    />
  </div>

  <div class="mt-8 block">
    <div
      class="flex items-center rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2"
    >
      <input
        class="appearance-text block w-full focus:outline-none"
        type="number"
        bind:value={$totalKilometres}
        min="0"
        id="kms"
      />
      <label class="text-sm font-bold text-gray-500" for="kms">KM</label>
    </div>

    <RangeSlider
      range="min"
      max={2500}
      bind:values={inputTotalKilometres}
      on:change={setTotalKilometres}
    />
  </div>
</div>
