<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { createPopperActions } from 'svelte-popperjs'

  import { Icon, CurrencyEuro } from 'svelte-hero-icons'

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
  let screenSize
</script>

<svelte:window
  on:scroll={() => (showTooltip = false)}
  bind:innerWidth={screenSize}
/>
<button
  class="shadow-xl rounded-lg border border-slate-200"
  on:click={openDetails}
>
  <div class="flex p-4">
    <div class="grid justify-center">
      <img
        class="h-4 justify-self-center"
        src={car.getLogo()}
        alt="Provider Logo"
      />
      <img
        class="justify-self-center w-24 h-16 md:w-28 md:h-18"
        src={car.getCarImg()}
        alt="Provider Logo"
      />
    </div>
    <div class="h-16 w-px bg-slate-200 mx-4 hidden md:block" />
    <div class="text-left">
      <h2 class="text-base font-normal md:font-medium">
        {car.getName()}
      </h2>

      <div
        class="flex md:flex-row items-start mt-1 gap-1.5 text-xs text-slate-500 md:text-sm"
      >
        <div class="flex gap-0.5 items-center">
          <Icon src={CurrencyEuro} size={((screenSize) => 768) ? '16' : '14'} />
          <p>
            {car.getFormattedMinutePrice()}
          </p>
        </div>
        <div class="flex gap-0.5 items-center">
          <Icon src={CurrencyEuro} size={((screenSize) => 768) ? '16' : '14'} />
          {car.getFormattedKilometrePrice()}
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
            class="bg-green hover:bg-green-600 text-white font-bold py-2 rounded w-60"
          >
            {$_('openInApp')}
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
