<script lang="ts">
  import { page } from '$app/stores'

  import ArrowsPointingIn from '$lib/Icons/Solid/ArrowsPointingIn.svelte'
  import ArrowsPointingOut from '$lib/Icons/Solid/ArrowsPointingOut.svelte'

  let href: string = '/map'
  let isFullscreen: boolean = $page.url.pathname == href
  let icon = ArrowsPointingOut

  if (isFullscreen) {
    href = '/'
    icon = ArrowsPointingIn
  }
</script>

<div class="absolute right-4 top-4">
  <a
    {href}
    class="block rounded-md fill-white p-2 shadow-lg shadow-black/20 transition-colors"
    class:bg-green-600={!isFullscreen}
    class:hover:bg-green-700={!isFullscreen}
    class:bg-red-600={isFullscreen}
    class:hover:bg-red-700={isFullscreen}
  >
    <svelte:component this={icon} class="h-6 w-6" />
  </a>
</div>
