<script lang="ts">
  import CarCard from '$lib/Components/CarCard.svelte'

  import { visibleCars } from '$lib/Store/Cars'
</script>

<div class="mt-4 space-y-4">
  {#each $visibleCars as car, i (car.getName() + '_' + car.getCarData().serviceId)}
    <CarCard {car} index={i} />
  {/each}
</div>
