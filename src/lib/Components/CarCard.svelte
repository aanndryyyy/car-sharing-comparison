<script lang="ts">
  import { _ } from 'svelte-i18n'

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

  import type BaseCar from '$lib/Car/BaseCar'
  import Divider from '$lib/Components/Divider.svelte'
  import CurrencyEuro from '$lib/Icons/Outline/CurrencyEuro.svelte'

  export let car: BaseCar
  export let index: number
  let screenSize
</script>

<svelte:window
  bind:innerWidth={screenSize}
/>
<button
  class="shadow-lg rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500"
  on:click={openDetails}
>
  <div class="flex">
    <div class="w-32 relative">
      <div class="absolute flex justify-center top-4 inset-x-0 ">
        <img
          class="h-4"
          src={car.getLogo()}
          alt="Provider Logo"
        />
      </div>
      <img
        class="w-auto h-10 mx-auto mt-8 mb-4 md:h-10"
        src={car.getCarImg()}
        alt="Provider Logo"
      />
    </div>

    <div class="flex grow items-center px-6 my-4 justify-between border-l border-slate-200">
      <div class="text-left">
        <h2 class="text-base font-normal md:font-medium">
          {car.getName()}
        </h2>
  
        <div
          class="flex md:flex-row items-start mt-1 gap-4 text-xs text-slate-500 md:text-sm"
        >
          <div class="flex gap-0.5 items-center md:gap-1">
            <CurrencyEuro class="stroke-slate-500 w-3 h-3 md:h-4 md:w-4" />
            {car.getFormattedMinutePrice()}
          </div>
          <div class="flex gap-0.5 items-center md:gap-1">
            <CurrencyEuro class="stroke-slate-500 w-3 h-3 md:h-4 md:w-4" />
            {car.getFormattedKilometrePrice()}
          </div>
        </div>
  
      </div>
  
      <h5 class="mt-1">
        {car.getFormattedTotalPrice()}
      </h5>
    </div>
  </div>
  <div
    class="transition-[height] ease-in-out delay-100 duration-500 overflow-hidden h-0"
    id={`offer-details-grow-${index}`}
  >
    <Divider />
    <div class="p-4 grid gap-2" id={`offer-details-wrapper-${index}`}>
      <div>
        <p class="text-left">
          For the cheapest ride select <b>package 1</b> and drive it over
          <b>23km</b>.
        </p>
      </div>
      <div class="mt-2">
        <a href="https://bolt.eu/et-ee/" target="”_blank”">
          <button
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded w-60"
          >
            {$_('openInApp')}
          </button>
        </a>
      </div>
    </div>
  </div>
</button>
