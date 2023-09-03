<script>
  export let pricePackage
</script>

<div class="flex">
  <div
    class="flex gap-2 rounded-2xl border border-slate-500 bg-slate-200 px-1 py-0.5"
  >
    <p>📦</p>
    <p>
      {pricePackage.days}d +
    </p>
    <p>
      {pricePackage.hours}h +
    </p>
    <p>
      {pricePackage.distance}km
    </p>
    <p>
      ({pricePackage.price}€)
    </p>
  </div>
</div>
