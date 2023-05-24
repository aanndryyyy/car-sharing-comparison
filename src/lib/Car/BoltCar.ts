import type BaseCar from './BaseCar'

import BoltLogo from '$lib/Images/bolt.png'
import type { SvelteComponent } from 'svelte'
import BoltCarPopover from '$lib/Popovers/BoltCarPopover.svelte'
import calculateBoltPrice from '../../helpers/Calculators/CalculateBoltPrice'
import type { ICarBolt } from '$lib/Types/Interfaces/ICarBolt'
import { Provider } from '../Types/Enums/Provider'
import No_image_available from '$lib/Images/no-image-available.png'
import Audi_A1 from '$lib/Images/Providers/Bolt/Cars/Audi-A1.png'
import Audi_A3 from '$lib/Images/Providers/Bolt/Cars/Audi-A3.png'
import Audi_A4 from '$lib/Images/Providers/Bolt/Cars/Audi-A4.png'
import Audi_A5 from '$lib/Images/Providers/Bolt/Cars/Audi-A5.png'
import Audi_e_tron from '$lib/Images/Providers/Bolt/Cars/Audi-e-tron.png'
import Audi_Q2 from '$lib/Images/Providers/Bolt/Cars/Audi-Q2.png'
import Audi_Q5 from '$lib/Images/Providers/Bolt/Cars/Audi-Q5.png'
import Audi_Q8 from '$lib/Images/Providers/Bolt/Cars/Audi-Q8.png'
import BMW_4_Convertible from '$lib/Images/Providers/Bolt/Cars/BMW-4-Convertible.png'
import Hyundai_i20 from '$lib/Images/Providers/Bolt/Cars/Hyundai-i20.png'
import Kia_Picanto from '$lib/Images/Providers/Bolt/Cars/Kia-Picanto.png'
import Mercedes_Sprinter from '$lib/Images/Providers/Bolt/Cars/Mercedes-Sprinter.png'
import Peugeot_208 from '$lib/Images/Providers/Bolt/Cars/Peugeot-208.png'
import Peugeot_2008 from '$lib/Images/Providers/Bolt/Cars/Peugeot-2008.png'
import Peugeot_3008 from '$lib/Images/Providers/Bolt/Cars/Peugeot-3008.png'
import Porsche_Taycan from '$lib/Images/Providers/Bolt/Cars/Porsche-Taycan.png'
import Renault_Captur from '../Images/Providers/Bolt/Cars/Renault-Captur.png'
import Renault_Megane_E_Tech from '$lib/Images/Providers/Bolt/Cars/Renault-Megane-E-Tech.png'
import Skoda_Fabia from '$lib/Images/Providers/Bolt/Cars/Skoda-Fabia.png'
import Skoda_Kamiq from '$lib/Images/Providers/Bolt/Cars/Skoda-Kamiq.png'
import Skoda_Scala from '$lib/Images/Providers/Bolt/Cars/Skoda-Scala.png'
import Tesla_Model_Y from '$lib/Images/Providers/Bolt/Cars/Tesla-Model-Y.png'
import Toyota_C_HR from '$lib/Images/Providers/Bolt/Cars/Toyota-C-HR.png'
import Toyota_Corolla from '$lib/Images/Providers/Bolt/Cars/Toyota-Corolla.png'
import Toyota_Highlander from '$lib/Images/Providers/Bolt/Cars/Toyota-Highlander.png'
import Toyota_Land_Cruiser from '$lib/Images/Providers/Bolt/Cars/Toyota-Land-Cruiser.png'
import Toyota_RAV4 from '$lib/Images/Providers/Bolt/Cars/Toyota-RAV4.png'
import Toyota_Yaris from '$lib/Images/Providers/Bolt/Cars/Toyota-Yaris.png'
import Toyota_Yaris_Cross from '$lib/Images/Providers/Bolt/Cars/Toyota-Yaris-Cross.png'
import VW_Arteon from '$lib/Images/Providers/Bolt/Cars/VW-Arteon.png'
import VW_e_Crafter from '$lib/Images/Providers/Bolt/Cars/VW-e-Crafter.png'
import VW_ID3 from '$lib/Images/Providers/Bolt/Cars/VW-ID3.png'
import VW_T_Cross from '$lib/Images/Providers/Bolt/Cars/VW-T-Cross.png'
import VW_T_Roc from '$lib/Images/Providers/Bolt/Cars/VW-T-Roc.png'
import VW_T_Roc_Cabrio from '$lib/Images/Providers/Bolt/Cars/VW-T-Roc-Cabrio.png'

class BoltCar implements BaseCar {
  readonly carData: ICarBolt
  markers: google.maps.marker.AdvancedMarkerElement[]
  rentTotalPrice: number | undefined

  /**
   * Initialise car data.
   *
   * @param car The car object.
   */
  constructor(car: ICarBolt) {
    this.carData = car
    this.markers = []
  }

  /**
   * @inheritdoc
   */
  getName(): string {
    return this.carData.name
  }

  /**
   * @inheritdoc
   */
  getProvider(): string {
    return Provider.BOLT
  }

  /**
   * @inheritdoc
   */
  calculateRentTotalPrice(): void {
    this.rentTotalPrice = calculateBoltPrice(this.carData)
  }

  /**
   * @inheritdoc
   */
  getTotalPrice(): number {
    return (this.rentTotalPrice = calculateBoltPrice(this.carData))
  }

  /**
   * @inheritdoc
   */
  getFormattedTotalPrice(): string {
    return this.getTotalPrice().toFixed(2) + ' €'
  }

  /**
   * @inheritdoc
   */
  getFormattedLongTermDiscount(): string {
    return 'TODO'
    // return ( this.getTotalPrice() - this.carData.price.minute * searchParamsObj.minutes ).toFixed(2) + " €";
  }

  /**
   * @inheritdoc
   */
  getFormattedMinutePrice(): string {
    const price = this.carData.price.minute
    return price + ' min'
  }

  /**
   * @inheritdoc
   */
  getFormattedKilometrePrice(): string {
    const price = this.carData.price.km
    return price + ' km'
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {
    return BoltLogo
  }

  getCarImg(): string {
    switch (this.carData.name) {
      case "VW T-Cross":
        return VW_T_Cross
      case "Toyota Yaris":
        return Toyota_Yaris
      case "Toyota C-HR":
        return Toyota_C_HR
      case "VW T-Roc":
        return VW_T_Roc
      case "VW Arteon":
        return VW_Arteon
      case "VW Crafter":
        return VW_e_Crafter
      case "VW e-Crafter":
        return VW_e_Crafter
      case "VW T-Roc Cabrio":
        return VW_T_Roc_Cabrio
      case "Toyota Land Cruiser":
        return Toyota_Land_Cruiser
      case "Audi A1":
        return Audi_A1
      case "Audi A3 ":
        return Audi_A3
      case "Audi Q2":
        return Audi_Q2
      case "Audi e-tron":
        return Audi_e_tron
      case "Škoda Fabia":
        return Skoda_Fabia
      case "Hyundai i20":
        return Hyundai_i20
      case "Mercedes Sprinter":
        return Mercedes_Sprinter
      case "Toyota Corolla":
        return Toyota_Corolla
      case "Toyota Yaris Cross":
        return Toyota_Yaris_Cross
      case "Škoda Scala":
        return Skoda_Scala
      case "Toyota Highlander":
        return Toyota_Highlander
      case "Škoda Kamiq":
        return Skoda_Kamiq
      case "Kia Picanto":
        return Kia_Picanto
      case "Renault Captur":
        return Renault_Captur
      case "Tesla Model Y":
        return Tesla_Model_Y
      case "Audi A4":
        return Audi_A4
      case "Audi A5":
        return Audi_A5
      case "Porsche Taycan":
        return Porsche_Taycan
      case "Renault Megane E-Tech":
        return Renault_Megane_E_Tech
      case "Peugeot 208":
        return Peugeot_208
      case "Peugeot 2008":
        return Peugeot_2008
      case "Peugeot 3008":
        return Peugeot_3008
      default:
        return No_image_available
    }
    // return this.carData.imageUrl
  }

  /**
   * @inheritdoc
   */
  getDetailedDialog(): { component: typeof SvelteComponent; props: object } {
    return {
      component: BoltCarPopover,
      props: {
        minimumFee: this.carData.price.min,
      },
    }
  }

  initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ) {
    this.carData.coordinates.forEach(({ lat, lng }) => {
      const content = document.createElement('div')
      content.className = 'dot-icon bg-brand-bolt'

      const position = { lat, lng } as google.maps.LatLngLiteral

      const marker = new AdvancedMarkerElement({
        map,
        content,
        position,
      })

      this.markers.push(marker)
    })
  }

  setMarkerIcons(type?: string) {
    this.markers.forEach((marker) => {
      switch (type) {
        case 'price':
          marker.content = this.getMarkerPriceIcon()
          break

        default:
          marker.content = this.getMarkerRegularIcon()
          break
      }
    })
  }

  getMarkerRegularIcon(): HTMLDivElement {
    const content = document.createElement('div')
    content.className = 'dot-icon bg-brand-bolt'

    return content
  }

  getMarkerPriceIcon(): HTMLDivElement {
    const content = document.createElement('div')
    content.className = 'dot-icon bg-brand-bolt'

    const priceIcon = document.createElement('div')
    priceIcon.className = 'price-icon'

    priceIcon.innerText = this.getTotalPrice().toFixed(0) + '€'
    priceIcon.appendChild(content)

    return priceIcon
  }
}

export default BoltCar
