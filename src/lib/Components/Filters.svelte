<script lang="ts">
  import { _ } from 'svelte-i18n'
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faXmark } from '@fortawesome/free-solid-svg-icons'
  import { Provider } from '../Types/Enums/Provider'
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
      values: [
        { title: 'Bolt', value: Provider.BOLT, active: true },
        { title: 'Citybee', value: Provider.CITYBEE, active: false },
        { title: 'Elmo', value: Provider.ELMO, active: false },
        { title: 'Avis', value: Provider.AVIS, active: false },
        { title: 'Beast', value: Provider.BEAST, active: false },
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
      <Fa icon={faXmark} size="1.5x" />
    </button>
  </div>

  {#each filters as filter}
    <div class="mt-6">
      <p>{filter.title}</p>
      <div class="flex gap-4 mt-1 overflow-scroll scrollbar-hide">
        {#each filter.values as value}
          <button
            class="bg-gray-200 rounded p-1.5 border-2"
            style={value.active ? 'border-color: gray' : ''}
            on:click={() => (value.active = !value.active)}
          >
            <p class="text-sm">
              {value.title}
            </p>
          </button>
        {/each}
      </div>
    </div>
  {/each}
</div>
