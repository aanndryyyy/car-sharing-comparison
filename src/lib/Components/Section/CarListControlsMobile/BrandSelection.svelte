<script lang="ts">
  import BeastLogo from '../../../../assets/images/providers/beast/beast-logo.png'
  import BoltLogo from '../../../../assets/images/providers/bolt/bolt-logo.png'
  import CityBeeLogo from '../../../../assets/images/providers/citybee/citybee-logo.png'
  import ElmoLogo from '../../../../assets/images/providers/elmo/elmo-logo.png'
  import AvisLogo from '../../../../assets/images/providers/avis/avis-logo.png'
  import { carsFilter } from '$lib/Store/FilterStore'
  import { Provider } from '$lib/Types/Enums/Provider'

  const providersInfo: any = [
    { title: 'Bolt', value: Provider.BOLT, imgUrl: BoltLogo },
    {
      title: 'Citybee',
      value: Provider.CITYBEE,
      imgUrl: CityBeeLogo,
    },
    { title: 'Elmo', value: Provider.ELMO, imgUrl: ElmoLogo },
    {
      title: 'Beast',
      value: Provider.BEAST,
      imgUrl: BeastLogo,
    },
    { title: 'Avis', value: Provider.AVIS, imgUrl: AvisLogo },
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
    {#each providersInfo as provider, index}
      <div class="inline-block">
        <input
          type="checkbox"
          class="peer hidden"
          id={'provider-' + index}
          value={provider.value}
          bind:group={$carsFilter.providers}
        />
        <label
          class="block rounded border-2 p-1.5 {$carsFilter.providers.some(
            (p) => p === provider.value
          )
            ? 'border-green-600 bg-green-200'
            : 'border-gray-200 bg-gray-200'}"
          for={'provider-' + index}
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
