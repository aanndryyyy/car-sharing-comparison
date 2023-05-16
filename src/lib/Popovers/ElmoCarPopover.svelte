<script lang="ts">
  export let type: 'eco' | 'comfy' | 'classy'
  export let classyMinimumFee: number
  export let priceAfter100: number
</script>

{#if type === 'classy'}
  Classy minimum fee: {classyMinimumFee} €<br /><br />
{/if}

After 100km: {priceAfter100}€/km<br /><br />

Week rent includes 700km free<br />
Month rent includes 3000km free<br /><br />

<b>Customer card:</b><br />
{#if type === 'classy'}
  2.50 €/hour and 0.16 €/km
{:else}
  1.00 €/hour and 0.10 €/km
{/if}
