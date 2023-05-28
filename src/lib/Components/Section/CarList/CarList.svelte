<script lang="ts">
  import CarCard from '$lib/Components/CarCard.svelte'

  import { visibleCars } from '$lib/Store/Cars'

  $: cars = $visibleCars.visible
</script>

<div class="mt-4 space-y-4">
  {#each cars as genericCar, i}
    <CarCard car={genericCar} index={i} />
  {/each}
</div>
