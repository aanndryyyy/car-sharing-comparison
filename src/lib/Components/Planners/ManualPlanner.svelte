<script lang="ts">
  import { days, duration, hours, minutes } from '$lib/Store/DurationStore'
  import { totalKilometres } from '$lib/Store/TotalKilometresStore'
  import { _ } from 'svelte-i18n'
  import RangeSlider from 'svelte-range-slider-pips'
</script>

<div class="mt-4 space-y-8 md:mt-6">
  <div>
    <div class="flex flex-row gap-2 md:flex-col lg:flex-row">
      <div
        class="flex items-center rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-1"
      >
        <input
          class="appearance-text block w-full focus:outline-none"
          type="number"
          bind:value={$days}
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
          bind:value={$hours}
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
          bind:value={$minutes}
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
      max={6000}
      values={[$duration]}
      on:change={(e) => ($duration = e.detail.value)}
    />
  </div>

  <div>
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
      max={1500}
      values={[$totalKilometres]}
      on:change={(e) => ($totalKilometres = e.detail.value)}
    />
  </div>
</div>

<style lang="postcss">
  :global(.rangeSlider) {
    margin: 16px 0 !important;
  }
  :global(.rangeSlider > .rangeBar) {
    background: #4ade80 !important;
  }
  :global(.rangeNub) {
    background: #16a34a !important;
  }
</style>
