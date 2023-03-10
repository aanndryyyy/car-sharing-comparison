<script lang="ts">
  import { createPopperActions } from 'svelte-popperjs';
  
  import InfoIcon from '$lib/Images/info.svg?url';
  
  const [popperRef, popperContent] = createPopperActions({
    placement: 'bottom',
    strategy: 'fixed',
  });
  
  const extraOpts = {
    modifiers: [
      { name: 'offset', options: { offset: [100, 8] } },
    ],
  };

  let showTooltip = false;

  import type BaseCar from "$lib/Car/BaseCar";
  
  import { duration } from "$lib/Store/DurationStore";
  import { totalKilometres } from "$lib/Store/TotalKilometresStore";

  export let car: BaseCar;
  export let index: number;
</script>

<style>
  
  :global([data-popper-placement^='top'] > [data-popper-arrow]) {
    bottom: -4px;
  }
  
  :global([data-popper-placement^='top'] > [data-popper-arrow]:before) {
    @apply border-b border-r;
  }

  :global([data-popper-placement^='bottom'] > [data-popper-arrow]) {
    @apply bg-gray-100;
    top: -4px;
  }

  :global([data-popper-placement^='bottom'] > [data-popper-arrow]::before) {
    @apply border-b border-l;
  }

  :global([data-popper-placement^='left'] > [data-popper-arrow]) {
    right: -4px;
  }

  :global([data-popper-placement^='right'] > [data-popper-arrow]) {
    left: -4px;
  }
</style>

<svelte:window on:scroll={() => showTooltip = false}/>

<div class="flex justify-between items-center p-4 shadow-md rounded-md border border-gray-500" class:border-green-600={index === 0} class:border-4={index === 0}>
          
  <div>
    <h2 class="font-semibold text-base mb-1 md:mb-2">
      {car.getName()}
      <img 
        class="inline h-5"
        src={InfoIcon} 
        alt="Info"
        use:popperRef
        on:mouseenter={() => showTooltip = true}
        on:mouseleave={() => showTooltip = false}
      />
    </h2>

    <div class="flex flex-col-reverse md:flex-row items-start md:items-center gap-4 align-center text-xs text-gray-600">
      <img class="object-contain h-6" src={car.getLogo()} alt="Provider Logo">
      <span>{car.getFormattedMinutePrice()} | {car.getFormattedKilometrePrice()}</span>
    </div>
  </div>

  <div class="text-2xl font-bold text-right" class:text-green-600={index === 0}>
    {car.getFormattedTotalPrice( $duration, $totalKilometres )}
    <span class="block text-xs font-normal text-blue-600" title="Long-term rent discount">{car.getFormattedLongTermDiscount( $duration, $totalKilometres )}</span>
  </div>
</div>

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
      <svelte:component this={car.getDetailedDialog().component} {...car.getDetailedDialog().props}/>
    </div>

    <div 
      data-popper-arrow 
      class="absolute w-2 h-2 bg-inherit invisible before:border-gray-200 before:absolute before:w-2 before:h-2 before:bg-inherit before:visible before:rotate-45"
    />
  </div>
{/if}