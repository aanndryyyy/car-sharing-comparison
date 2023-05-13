<script lang="ts">
  import { _ } from 'svelte-i18n';
  import Fa from 'svelte-fa/src/fa.svelte'
  import {faMap} from "@fortawesome/fontawesome-free-regular";
  import {faSliders} from "@fortawesome/free-solid-svg-icons";
</script>

<section class="md:col-start-2 md:col-end-4">
  
  <div class="flex justify-between items-center">
    <div>
      <h3>{$_('cars.title')}</h3>
      <span class="flex gap-1 mt-2">
        <Fa icon={faSliders} rotate={90} color="green" size="1.2x"/>
        <p class="text-green">
          Cheapest first
        </p>
      </span>

    </div>

    <div class="h-11 py-1.5 px-2 gap-2 flex items-center justify-center border-2 border-green rounded text-green">
      <Fa icon={faMap} color="green" size="1.2x"/>
      <h4>Map</h4>
    </div>
  </div>

  <div class="grid gap-4 auto-cols-fr mt-4">
    <slot/>
  </div>
</section>