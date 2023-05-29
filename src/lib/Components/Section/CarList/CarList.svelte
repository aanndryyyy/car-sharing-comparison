<script lang="ts">
  import CarCard from '$lib/Components/CarCard.svelte'

  import { visibleCars } from '$lib/Store/Cars'

  $: cars = $visibleCars.visible
</script>

<div class="mt-4 space-y-4">
  {#each cars as car, i (car.getName() + '_' + car.carData.serviceId)}
    <CarCard {car} index={i} />
  {/each}
</div>
