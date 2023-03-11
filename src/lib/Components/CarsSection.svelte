<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<section class="md:col-start-2 md:col-end-4">
  
  <div class="mb-6">
    <h2 class="text-2xl md:text-3xl">{$_('cars.title')}</h2>

    <small class="text-gray-500">{@html $_('cars.subtitle')}</small>
  </div>

  <div class="grid gap-4 auto-cols-fr">
    <slot/>
  </div>
</section>