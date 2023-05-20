<script lang="ts">
  import { _ } from 'svelte-i18n'
  import Divider from '$lib/Components/Divider.svelte'
  import CurrencyEuro from '$lib/Icons/Outline/CurrencyEuro.svelte'
  import type BaseCar from '$lib/Car/BaseCar'

  export let car: BaseCar
  export let index: number

  const openDetails = () => {
    const growDiv = document.getElementById(`offer-details-grow-${index}`)
    if (growDiv.clientHeight) {
      growDiv.style.height = '0'
      growDiv.style.overflow = 'hidden'
    } else {
      const wrapper = document.getElementById(`offer-details-wrapper-${index}`)
      growDiv.style.height = wrapper.clientHeight + 41 + 'px'
      setTimeout(() => {
        growDiv.style.overflow = 'inherit'
      }, 500)
    }
  }

  let screenSize: number
</script>

<svelte:window bind:innerWidth={screenSize} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="w-full rounded-lg border border-slate-200 p-4 text-left shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:p-0"
  on:click={openDetails}
>
  <div class="flex sm:flex-row-reverse">
    <div
      class="flex grow flex-col gap-1 sm:my-4 sm:flex-row sm:items-center sm:justify-between sm:border-l sm:border-slate-200 sm:px-6"
    >
      <div class="space-y-1">
        <h2 class="text-base font-normal md:font-medium">
          {car.getName()}
        </h2>

        <div
          class="flex items-start gap-2 text-xs text-slate-500 sm:gap-4 md:flex-row md:text-sm"
        >
          <div class="flex items-center gap-0.5 md:gap-1">
            <CurrencyEuro class="h-3 w-3 stroke-slate-500 md:h-4 md:w-4" />
            {car.getFormattedMinutePrice()}
          </div>
          <div class="flex items-center gap-0.5 md:gap-1">
            <CurrencyEuro class="h-3 w-3 stroke-slate-500 md:h-4 md:w-4" />
            {car.getFormattedKilometrePrice()}
          </div>
        </div>
      </div>

      <p class="font-semibold">{car.getFormattedTotalPrice()}</p>
    </div>

    <div class="relative flex items-center sm:w-32">
      <div class="absolute inset-x-0 top-0 flex justify-center sm:top-4">
        <img class="h-4" src={car.getLogo()} alt="Provider Logo" />
      </div>
      <img
        class="mx-auto h-10 w-auto md:h-10"
        src={car.getCarImg()}
        alt="Provider Logo"
      />
    </div>
  </div>

  <div
    class="h-0 overflow-hidden transition-[height] delay-100 duration-500 ease-in-out"
    id={`offer-details-grow-${index}`}
  >
    <Divider />
    <div class="grid gap-2 p-4" id={`offer-details-wrapper-${index}`}>
      <div>
        <p class="text-left">
          For the cheapest ride select <b>package 1</b> and drive it over
          <b>23km</b>.
        </p>
      </div>
      <div class="mt-2">
        <a href="https://bolt.eu/et-ee/" target="”_blank”">
          <button
            class="w-60 rounded bg-green-600 py-2 font-bold text-white hover:bg-green-700"
          >
            {$_('openInApp')}
          </button>
        </a>
      </div>
    </div>
  </div>
</div>
