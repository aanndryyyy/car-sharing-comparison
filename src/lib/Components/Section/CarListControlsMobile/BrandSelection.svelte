<script lang="ts">
  import BeastLogo from '$lib/Images/beast.png'
  import BoltLogo from '$lib/Images/bolt.png'
  import CityBeeLogo from '$lib/Images/citybee.png'
  import ElmoLogo from '$lib/Images/elmo.png'
  import { carsFilter } from '$lib/Store/FilterStore'
  import { Provider } from '$lib/Types/Enums/Provider'

  let providers = $carsFilter.providers

  const providersInfo: Record<Provider, any> = {
    [Provider.BOLT]: { title: 'Bolt', value: Provider.BOLT, imgUrl: BoltLogo },
    [Provider.CITYBEE]: {
      title: 'Citybee',
      value: Provider.CITYBEE,
      imgUrl: CityBeeLogo,
    },
    [Provider.ELMO]: { title: 'Elmo', value: Provider.ELMO, imgUrl: ElmoLogo },
    [Provider.AVIS]: { title: 'Avis', value: Provider.AVIS, imgUrl: ElmoLogo },
    [Provider.BEAST]: {
      title: 'Beast',
      value: Provider.BEAST,
      imgUrl: BeastLogo,
    },
  }
</script>

<div class="space-y-1">
  <h4 class="text-base font-normal">Brands</h4>
  <div class="space-x-4 overflow-x-scroll whitespace-nowrap scrollbar-hide">
    {#each providers as provider, index}
      <div class="inline-block">
        <input
          type="checkbox"
          class="peer hidden"
          id={'provider-' + index}
          value={provider}
          bind:group={$carsFilter.providers}
        />
        <label
          class="block rounded border-2 border-slate-300 px-4 py-3 peer-checked:border-green-600"
          for={'provider-' + index}
        >
          <img
            class="block h-5 w-12 object-contain"
            src={providersInfo[provider].imgUrl}
            alt={providersInfo[provider].title}
          />
        </label>
      </div>
    {/each}
  </div>
</div>
