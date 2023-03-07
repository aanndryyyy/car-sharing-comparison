<script lang="ts">
  import type BaseCar from "$lib/BaseCar";
  import type { PageData } from "./$types";
  export let data: PageData;

  let totalMinutes    = 86;
  let totalKilometres = 86;

  let allCars: BaseCar[] = [ ...data.boltCars, ...data.cityBeeCars, ...data.elmoCars, ...data.beastCars ];

  allCars.sort( function( car1: BaseCar, car2: BaseCar ) {
    let firstPer = car1.getTotalPrice( totalMinutes, totalKilometres );
    let secPer   = car2.getTotalPrice( totalMinutes, totalKilometres );

    return firstPer - secPer;
  });
</script>

<h1 class="text-5xl">Comaprison by company</h1>
<h2 class="text-3xl">Bolt</h2>
{#each data.boltCars as genericCar }
{genericCar.getName()}<br>
{/each}

<h2 class="text-3xl">CityBee</h2>
{#each data.cityBeeCars as genericCar }
{genericCar.getName()}<br>
{/each}

<h2 class="text-3xl">ELMO</h2>
{#each data.elmoCars as genericCar }
{genericCar.getName()}<br>
{/each}

<h2 class="text-3xl">Beast</h2>
{#each data.beastCars as genericCar }
{genericCar.getName()}<br>
{/each}

<hr>

<h1 class="text-5xl">Common view</h1>
{#each allCars as genericCar }
  <span class="text-green-500">{genericCar.getName()}</span> <strong>{genericCar.getFormattedTotalPrice(totalMinutes, totalKilometres)}</strong><br>
{/each}
