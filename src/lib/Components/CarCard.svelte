<script lang="ts">
  import { createPopperActions } from 'svelte-popperjs'

  import InfoIcon from '$lib/Images/info.svg?url'

  const [popperRef, popperContent] = createPopperActions({
    placement: 'bottom',
    strategy: 'fixed',
  })

  const extraOpts = {
    modifiers: [{ name: 'offset', options: { offset: [100, 8] } }],
  }
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

  let showTooltip = false

  import type BaseCar from '$lib/Car/BaseCar'
  import Divider from '$lib/Components/Divider.svelte'

  export let car: BaseCar
  export let index: number
</script>

<svelte:window on:scroll={() => (showTooltip = false)} />

<button
  class="p-4 shadow-xl rounded-md border border-gray-300"
  on:click={openDetails}
>
  <div class="grid grid-cols-3">
    <div class="col-span-2 text-left">
      <h2 class="text-base font-normal">
        {car.getName()}
        <img
          class="inline h-5"
          src={InfoIcon}
          alt="Info"
          use:popperRef
          on:mouseenter={() => (showTooltip = true)}
          on:mouseleave={() => (showTooltip = false)}
        />
      </h2>

      <div
        class="flex flex-col-reverse md:flex-row items-start md:items-center gap-4 align-center text-xs text-gray-600"
      >
        <span
          >{car.getFormattedMinutePrice()} | {car.getFormattedKilometrePrice()}</span
        >
      </div>

      <h4>
        {car.getFormattedTotalPrice()}
      </h4>
    </div>

    <div class="col-span-1 grid grid-cols-1">
      <img
        class="h-4 justify-self-center"
        src={car.getLogo()}
        alt="Provider Logo"
      />
      <img
        class="justify-self-center w-28 h-18"
        src={car.getCarImg()}
        alt="Provider Logo"
      />
    </div>
  </div>
  <div
    class="transition-[height] ease-in-out delay-100 duration-500 overflow-hidden h-0"
    id={`offer-details-grow-${index}`}
  >
    <Divider />
    <div
      class="grid p-2 gap-2 justify-center"
      id={`offer-details-wrapper-${index}`}
    >
      <!--      <div>-->
      <!--        <p v-if="provider === 'citybee'" class="inline" id="to-app">-->
      <!--          💰 Cashback TODO-->
      <!--        </p>-->
      <!--      </div>-->
      <div>
        <p>
          For the cheapest ride select <b>package 1</b> and drive it over
          <b>23km</b>.
        </p>
      </div>
      <div class="mt-2">
        <a href="https://bolt.eu/et-ee/" target="”_blank”">
          <button
            class="bg-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-60"
          >
            To App
          </button>
        </a>
      </div>
    </div>
  </div>
</button>

{#if showTooltip}
  <div
    use:popperContent={extraOpts}
    class="absolute z-10 inline-block w-64 text-sm font-light text-gray-600 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow"
    role="tooltip"
  >
    <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
      <h3 class="font-semibold text-gray-900">Details</h3>
    </div>
    <div class="px-3 py-2">
      <svelte:component
        this={car.getDetailedDialog().component}
        {...car.getDetailedDialog().props}
      />
    </div>

    <div
      data-popper-arrow
      class="absolute w-2 h-2 bg-inherit invisible before:border-gray-200 before:absolute before:w-2 before:h-2 before:bg-inherit before:visible before:rotate-45"
    />
  </div>
{/if}
