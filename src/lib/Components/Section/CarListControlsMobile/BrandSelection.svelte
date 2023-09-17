<script lang="ts">
  import BeastLogo from '../../../../assets/images/providers/beast/beast-logo.png?url&format=webp'
  import BoltLogo from '../../../../assets/images/providers/bolt/bolt-logo.png?url&format=webp'
  import CityBeeLogo from '../../../../assets/images/providers/citybee/citybee-logo.png?url&format=webp'
  import ElmoLogo from '../../../../assets/images/providers/elmo/elmo-logo.png?url&format=webp'
  import AvisLogo from '../../../../assets/images/providers/avis/avis-logo.png?url&format=webp'
  import { carsFilter } from '$lib/Store/FilterStore'
  import { Provider } from '$lib/Types/Enums/Provider'

  const providersInfo: any = [
    { imgUrl: BoltLogo, title: 'Bolt', value: Provider.BOLT },
    { imgUrl: CityBeeLogo, title: 'Citybee', value: Provider.CITYBEE },
    { imgUrl: ElmoLogo, title: 'Elmo', value: Provider.ELMO },
    { imgUrl: BeastLogo, title: 'Beast', value: Provider.BEAST },
    { imgUrl: AvisLogo, title: 'Avis', value: Provider.AVIS },
  ]

  export let grid = false
</script>

<div class="space-y-1">
  <h4 class="text-base font-normal">Brands</h4>
  <div
    class="space-x-4 overflow-x-scroll whitespace-nowrap scrollbar-hide {grid
      ? 'contents'
      : ''}"
  >
    {#each providersInfo as provider}
      <div class="inline-block">
        <input
          type="checkbox"
          class="peer hidden"
          id={'provider-' + provider.title}
          value={provider.value}
          bind:group={$carsFilter.providers}
        />
        <label
          class="block rounded border-2 p-1.5 {$carsFilter.providers.some(
            (p) => p === provider.value
          )
            ? 'border-green-600 bg-green-200'
            : 'border-gray-200 bg-gray-200'}"
          for={'provider-' + provider.title}
        >
          <img
            class="block h-5 w-14 object-contain"
            src={provider.imgUrl}
            alt={provider.title}
          />
        </label>
      </div>
    {/each}
  </div>
</div>
