<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { onMount } from 'svelte'
  import Divider from '$lib/Components/Divider.svelte'
  import type GenericCar from '$lib/Car/GenericCar'
  import GenericMappableCar from '$lib/Car/GenericMappableCar'
  import PersonWalking from '../../assets/icons/person-walking.svg'
  import PersonWalkingSmall from '../../assets/icons/person-walking-small.svg'
  import { CurrencyEuro, Icon } from 'svelte-hero-icons'
  import { Provider } from '../Types/Enums/Provider'
  import { map } from '$lib/Store/GoogleMapStore'
  import { carsSort } from '$lib/Store/FilterStore'
  import { CarSortField } from '$lib/Types/Enums/CarSortField'
  import { getPosition } from '../../helpers/position'
  import PackageInfoContainer from '$lib/Components/Section/CarList/PackageInfoContainer.svelte'
  import AvailableCarsContainer from '$lib/Components/Section/CarList/AvailableCarsContainer.svelte'

  export let car: GenericCar
  export let index: number

  async function openDetails(): Promise<void> {
    const growDiv = document.getElementById(`offer-details-grow-${index}`)
    if (growDiv.clientHeight) {
      growDiv.style.height = '0'
      growDiv.style.overflow = 'hidden'
      setTimeout(() => markAllCars(false), 50)
    } else {
      zoomToCurrentLocation()
      const wrapper = document.getElementById(`offer-details-wrapper-${index}`)
      growDiv.style.height = wrapper.clientHeight + 41 + 'px'
      setTimeout(() => {
        growDiv.style.overflow = 'inherit'
      }, 500)
      setTimeout(() => markAllCars(true), 50)
    }
  }

  const markAllCars = (showBorder) => {
    car.markers.forEach((marker) => {
      if (showBorder) {
        marker.element.style.border = '3px solid purple'
        marker.element.style.borderRadius = '13px'
        marker.zIndex = 200
      } else {
        marker.element.style.border = null
        marker.zIndex = 10
      }
    })
  }

  function zoomToCurrentLocation() {
    if ($carsSort.value !== CarSortField.DISTANCE) return
    getPosition()
      .then((position) => {
        $map.setZoom(14)
        $map.panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
      .catch((err: Error) => {
        alert(
          err.message +
            '\n\nFailed to load location! Make sure that the browser has the right to share your location!'
        )
      })
  }

  const getAppLink = () => {
    if (car.provider === Provider.BOLT) {
      return 'https://bolt.onelink.me/sbJ2/7c3bdcee'
    }

    // Let's make sure what platform is used
    const isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    if (isAndroid) {
      switch (car.provider) {
        case Provider.BEAST:
          return 'https://play.google.com/store/apps/details?id=co.electricbeast.beast'
        case Provider.CITYBEE:
          return 'https://play.google.com/store/apps/details?id=com.primeleasing.citybee'
        case Provider.ELMO:
          return 'https://play.google.com/store/apps/details?id=ee.elmorent.rent&hl=en&gl=US'
      }
    } else if (isIOS) {
      switch (car.provider) {
        case Provider.BEAST:
          return 'https://apps.apple.com/us/app/beast-rent/id1521729069'
        case Provider.CITYBEE:
          return 'https://apps.apple.com/ee/app/citybee-shared-mobility/id966537355'
        case Provider.ELMO:
          return 'https://apps.apple.com/ee/app/elmo-rent/id1567760991'
      }
    } else {
      switch (car.provider) {
        case Provider.BEAST:
          return 'https://beast.rent/'
        case Provider.CITYBEE:
          return 'https://citybee.ee/'
        case Provider.ELMO:
          return 'https://elmorent.ee/'
      }
    }
    throw 'Missing provider: ' + car.provider
  }

  onMount(async () => {
    initView()
    window.addEventListener('resize', initView)
    appLink = getAppLink()
  })

  const initView = () => {
    mobileView = screenSize < 768 || window.location.pathname === '/map'
  }

  let screenSize: number
  let mobileView: boolean
  let appLink: string
</script>

<svelte:window bind:innerWidth={screenSize} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="w-full rounded-lg border border-slate-200 text-left shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 {mobileView
    ? 'p-4'
    : 'p-0'}"
  on:click={openDetails}
>
  <div class="flex {mobileView ? '' : 'flex-row-reverse'}">
    <div
      class="flex grow gap-1 {mobileView
        ? 'flex-col'
        : 'my-4 flex-row items-center justify-between border-l border-slate-200 px-6'}"
    >
      <div class="space-y-1">
        <h2 class="text-base {mobileView ? 'font-normal' : 'font-medium'}">
          {car.getName()}
        </h2>

        <div
          class="flex items-start gap-2 text-slate-500 {mobileView
            ? 'text-xs'
            : 'flex-row gap-4 text-sm'}"
        >
          <div class="flex items-center gap-0.5 {mobileView ? '' : 'gap-1'}">
            <Icon src={CurrencyEuro} size={mobileView ? '14' : '16'} />
            {car.getFormattedMinutePrice()}
          </div>
          <div class="flex items-center gap-0.5 {mobileView ? '' : 'gap-1'}">
            <Icon src={CurrencyEuro} size={mobileView ? '14' : '16'} />
            {car.getFormattedKilometrePrice()}
          </div>
          {#if car instanceof GenericMappableCar}
            <div
              class="flex items-center gap-0.5 {mobileView ? '' : 'gap-1'}"
              class:hidden={!car.closestMarkerDistance}
            >
              {#if mobileView}
                <PersonWalkingSmall class="text-slate-500" />
              {:else}
                <PersonWalking class="text-slate-500" />
              {/if}
              {car.getMarkerDistanceFormatted(car.closestMarkerDistance)}
            </div>
          {/if}
          {#if car.rentUsablePackages.length > 0 && !mobileView}
            <div>📦</div>
          {/if}
        </div>
      </div>

      <div class="flex gap-2">
        <p class="font-semibold">{car.getFormattedTotalPrice()}</p>
        {#if car.rentUsablePackages.length > 0 && mobileView}
          <div>with 📦</div>
        {/if}
      </div>
    </div>

    <div class="relative flex w-24 items-center {mobileView ? '' : 'w-32'}">
      <div
        class="absolute inset-x-0 top-0 flex justify-center {mobileView
          ? ''
          : 'top-4'}"
      >
        <img
          class="h-4"
          src={car.getLogo()}
          alt="Provider Logo"
          loading="lazy"
        />
      </div>
      <img
        class="mx-auto h-14 w-auto {mobileView ? '' : 'mb-2 mt-6'}"
        src={car.getCarImg()}
        alt="Car"
        loading="lazy"
      />
    </div>
  </div>

  <div
    class="h-0 overflow-hidden transition-[height] delay-100 duration-500 ease-in-out"
    id={`offer-details-grow-${index}`}
  >
    <div class="mt-2" />
    <Divider />
    <div class="grid gap-2 p-4" id={`offer-details-wrapper-${index}`}>
      {#if car.provider === Provider.BOLT && car.getTotalPrice() <= 3.99}
        <p>
          The final price depends on your starting fee, which can vary between
          1.99€ to 3.99€. Starting fee depends on how much you have driven short
          distances. In the calculation, the starting fee is {car.carData.price
            .minimum}€.
        </p>
      {/if}
      <AvailableCarsContainer carsCount={car.carData.coordinates.length} provider="{car.provider}" />
      {#if car.rentUsablePackages.length > 0}
        <p>Take these packages:</p>
        <div class="grid gap-2">
          {#each car.rentUsablePackages as pricePackage}
            <PackageInfoContainer {pricePackage} />
          {/each}
        </div>
      {/if}
      <div class="mt-2">
        <a href={appLink} target="”_blank”">
          <button
            class="w-60 rounded bg-green-600 py-2 font-bold text-white hover:bg-green-700"
          >
            {$_('openInApp')}
          </button>
        </a>
      </div>
    </div>
  </div>
</div>
