<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { Provider } from '../Types/Enums/Provider'
  import { Icon, XMark } from 'svelte-hero-icons'
  import BoltLogo from '$lib/Images/bolt.png'
  import CityBeeLogo from '$lib/Images/citybee.png'
  import ElmoLogo from '$lib/Images/elmo.png'
  import BeastLogo from '$lib/Images/beast.png'
  export let open = false

  const filters = [
    {
      title: 'Sorting',
      values: [
        { title: 'Cheapest first', value: 'cheapestFirst', active: false },
        { title: 'Closest first', value: 'closestFirst', active: false },
      ],
    },
    {
      title: 'Brands',
      // $lib/Images/bolt.png
      values: [
        { title: 'Bolt', value: Provider.BOLT, imgUrl: BoltLogo, active: true },
        {
          title: 'Citybee',
          value: Provider.CITYBEE,
          imgUrl: CityBeeLogo,
          active: false,
        },
        {
          title: 'Elmo',
          value: Provider.ELMO,
          imgUrl: ElmoLogo,
          active: false,
        },
        { title: 'Avis', value: Provider.AVIS, imgUrl: null, active: false },
        {
          title: 'Beast',
          value: Provider.BEAST,
          imgUrl: BeastLogo,
          active: false,
        },
      ],
    },
    {
      title: 'Car Type',
      values: [
        { title: 'Compact', value: 'Compact', active: false },
        { title: 'Everyday', value: 'Everyday', active: false },
        { title: 'SUV', value: 'SUV', active: false },
        { title: 'Premium', value: 'Premium', active: false },
        { title: 'Cargo', value: 'Cargo', active: false },
        { title: 'Other', value: 'Other', active: false },
      ],
    },
    {
      title: 'Fuel',
      values: [
        { title: 'Electric', value: 'Electric', active: false },
        { title: 'Gas', value: 'Gas', active: false },
      ],
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

  {#each filters as filter}
    <div class="mt-6">
      <p>{filter.title}</p>
      <div class="flex gap-4 mt-1 overflow-scroll scrollbar-hide">
        {#each filter.values as value}
          <button
            class="bg-gray-200 rounded py-1.5 px-2 border-2"
            style={value.active ? 'border-color: gray' : ''}
            on:click={() => (value.active = !value.active)}
          >
            {#if value.imgUrl}
              <div class="h-5 w-16 flex justify-center">
                <img src={value.imgUrl} alt={value.title} width="48" />
              </div>
            {:else}
              <p class="text-sm">
                {value.title}
              </p>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  {/each}
</div>
