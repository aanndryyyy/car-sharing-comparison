<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { Provider } from '../Types/Enums/Provider'
  import { Icon, XMark } from 'svelte-hero-icons'
  import BoltLogo from '$lib/Images/bolt.png'
  import CityBeeLogo from '$lib/Images/citybee.png'
  import ElmoLogo from '$lib/Images/elmo.png'
  import BeastLogo from '$lib/Images/beast.png'
  import FilterItemLayer from '$lib/Components/FilterItemLayer.svelte'
  import { carsFilter } from '../Store/FilterStore'

  export let open = false

  const providers = [
    {
      title: 'Bolt',
      value: Provider.BOLT,
      imgUrl: BoltLogo,
      active: $carsFilter.provider.BOLT,
    },
    {
      title: 'Citybee',
      value: Provider.CITYBEE,
      imgUrl: CityBeeLogo,
      active: $carsFilter.provider.CITYBEE,
    },
    {
      title: 'Elmo',
      value: Provider.ELMO,
      imgUrl: ElmoLogo,
      active: $carsFilter.provider.ELMO,
    },
    {
      title: 'Avis',
      value: Provider.AVIS,
      imgUrl: null,
      active: $carsFilter.provider.AVIS,
    },
    {
      title: 'Beast',
      value: Provider.BEAST,
      imgUrl: BeastLogo,
      active: $carsFilter.provider.BEAST,
    },
  ]
</script>

<div class="p-4">
  <div class="flex justify-between">
    <h3>
      {$_('filters')}
    </h3>

    <button on:click={() => (open = false)}>
      <Icon src={XMark} size="24" />
    </button>
  </div>

  <div>
    <div>
      <p>Brands</p>
      <div class="mt-1 flex gap-4 overflow-scroll scrollbar-hide">
        {#each providers as provider}
          <FilterItemLayer
            active={provider.active}
            onClick={() => {
              provider.active = !provider.active
              $carsFilter.provider[provider.value] = provider.active
            }}
          >
            <div class="flex h-5 w-16 justify-center">
              <img src={provider.imgUrl} alt={provider.title} width="48" />
            </div>
          </FilterItemLayer>
        {/each}
      </div>
    </div>
  </div>
</div>
