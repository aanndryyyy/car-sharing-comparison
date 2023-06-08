<script lang="ts">
  import { page } from '$app/stores'
  import { Icon, ArrowsPointingOut, ArrowsPointingIn } from 'svelte-hero-icons'

  let isFullscreen: boolean = $page.url.pathname == '/map'
  let href: string = isFullscreen ? '/' : '/map'
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
    <Icon
      src={isFullscreen ? ArrowsPointingIn : ArrowsPointingOut}
      size="24"
      class="text-white"
    />
  </a>
</div>
