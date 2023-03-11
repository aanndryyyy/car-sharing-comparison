<script lang="ts">
  import type BaseCar from "$lib/Car/BaseCar";
  
  import { totalDurationMinutes } from "$lib/Store/TotalDurationMinutesStore";
  import { totalKilometres } from "$lib/Store/TotalKilometresStore";

  export let car: BaseCar;
  export let index: number;
</script>

<div class="flex justify-between items-center p-4 shadow-md rounded-md border border-gray-500" class:border-green-600={index === 0} class:border-2={index === 0}>
          
  <div>
    <h2 class="font-semibold text-base mb-2">{car.getName()}</h2>
    <div class="flex align-center text-xs text-gray-600">
      <img class="inline h-4 pr-4" src={car.getLogo()} alt="Provider Logo">
      {car.getFormattedMinutePrice()} | {car.getFormattedKilometrePrice()}
    </div>
  </div>

  <div class="text-2xl font-bold text-right" class:text-green-600={index === 0}>
    {car.getFormattedTotalPrice( $totalDurationMinutes, $totalKilometres )}
    <span class="block text-xs font-normal text-blue-600" title="Long-term rent discount">{car.getFormattedLongTermDiscount( $totalDurationMinutes, $totalKilometres )}</span>
  </div>
</div>