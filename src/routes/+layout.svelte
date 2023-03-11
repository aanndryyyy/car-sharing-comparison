<script lang="ts">  
  import "./page.css";

  import { browser } from '$app/environment'
  import '$lib/i18n' // Import to initialize. Important :)
  import { locale, waitLocale, isLoading } from 'svelte-i18n'
  import type { LayoutLoad } from './$types'

  export const load: LayoutLoad = async () => {
    if (browser) {
      locale.set(window.navigator.language)
    }
    await waitLocale()
  }
</script>

{#if ! $isLoading}
  <slot />
{/if}