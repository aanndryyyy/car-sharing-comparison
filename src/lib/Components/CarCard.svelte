<script lang="ts">
  import type BaseCar from "$lib/Car/BaseCar";
  
  import { duration } from "$lib/Store/DurationStore";
  import { totalKilometres } from "$lib/Store/TotalKilometresStore";

  export let car: BaseCar;
  export let index: number;
</script>

<div class="flex justify-between items-center p-4 shadow-md rounded-md border border-gray-500" class:border-green-600={index === 0} class:border-2={index === 0}>
          
  <div>
    <h2 class="font-semibold text-base mb-1 md:mb-2">{car.getName()}</h2>

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