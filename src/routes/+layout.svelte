<script lang="ts">
  import './page.css'

  import '$lib/i18n'
  import { browser } from '$app/environment'
  import { locale, waitLocale, isLoading } from 'svelte-i18n'
  import type { LayoutLoad } from './$types'
  import TopBarNavigation from '$lib/Components/TopBarNavigation.svelte'

  export const load: LayoutLoad = async () => {
    if (browser && ['en-US', 'et'].includes(window.navigator.language)) {
      locale.set(window.navigator.language)
    }

    await waitLocale()
  }
</script>

<TopBarNavigation />
{#if !$isLoading}
  <slot />
{/if}
