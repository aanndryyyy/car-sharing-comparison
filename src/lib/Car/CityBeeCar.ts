import type BaseCar from './GenericCar'

import CityBeeLogo from '$lib/Images/citybee.svg'
import type { SvelteComponent } from 'svelte'
import CityBeeCarPopover from '$lib/Popovers/CityBeeCarPopover.svelte'
import type { ICarCityBee } from '$lib/Types/Interfaces/ICarCityBee'
import { Provider } from '../Types/Enums/Provider'
import No_image_available from '$lib/Images/no-image-available.png'
import VW_Crafter from '$lib/Images/Providers/Citybee/Cars/VW-Crafter.png'
import Toyota_Yaris from '$lib/Images/Providers/Citybee/Cars/Toyota-Yaris.png'
import Skoda_Fabia from '$lib/Images/Providers/Citybee/Cars/Skoda-Fabia.png'
import Nissan_Juke from '$lib/Images/Providers/Citybee/Cars/Nissan-Juke.png'
import VW_T_Cross from '$lib/Images/Providers/Citybee/Cars/VW-T-Cross.png'
import Toyota_RAV4 from '$lib/Images/Providers/Citybee/Cars/Toyota-RAV4.png'
import Toyota_Yaris_Cross from '$lib/Images/Providers/Citybee/Cars/Toyota-Yaris-Cross.png'
import Citroen_C3 from '$lib/Images/Providers/Citybee/Cars/Citroen-C3.png'
import VW_T_Roc_R_Line from '$lib/Images/Providers/Citybee/Cars/VW-T-Roc-R-Line.png'
import Renault_Master from '$lib/Images/Providers/Citybee/Cars/Renault-Master.png'
import Ford_Focus from '$lib/Images/Providers/Citybee/Cars/Ford-Focus.png'
import Ford_Kuga from '$lib/Images/Providers/Citybee/Cars/Ford-Kuga.png'
import Jeep_Compass from '$lib/Images/Providers/Citybee/Cars/Jeep-Compass.png'
import Ford_Fiesta from '$lib/Images/Providers/Citybee/Cars/Ford-Fiesta.png'
import Skoda_Kamiq from '$lib/Images/Providers/Citybee/Cars/Skoda-Kamiq.png'
import VW_Taigo from '$lib/Images/Providers/Citybee/Cars/VW-Taigo.png'
import Toyota_C_HR from '$lib/Images/Providers/Citybee/Cars/Toyota-C-HR.png'
import Nissan_Qashqai from '$lib/Images/Providers/Citybee/Cars/Nissan-Qashqai.png'
import Renault_Clio from '$lib/Images/Providers/Citybee/Cars/Renault-Clio.png'
import Renult_Arkana from '$lib/Images/Providers/Citybee/Cars/Renult-Arkana.png'
import Ford_Transit from '$lib/Images/Providers/Citybee/Cars/Ford-Transit.png'
import Kia_Sportage from '$lib/Images/Providers/Citybee/Cars/Kia-Sportage.png'
import MAN_TGE from '$lib/Images/Providers/Citybee/Cars/MAN-TGE.png'
import Opel_Crossland from '$lib/Images/Providers/Citybee/Cars/Opel-Crossland.png'
import Ford_Focus_Estate from '$lib/Images/Providers/Citybee/Cars/Ford-Focus-Estate.png'
import Fiat_Multipla from '$lib/Images/Providers/Citybee/Cars/Fiat-Multipla.png'
import BMW_118i from '$lib/Images/Providers/Citybee/Cars/BMW-118i.png'
import Fiat_500e from '$lib/Images/Providers/Citybee/Cars/Fiat-500e.png'
import Peugeot_308 from '$lib/Images/Providers/Citybee/Cars/Peugeot-308.png'
import GenericCar from './GenericCar'

export default class CityBeeCar extends GenericCar<ICarCityBee> {
  markers?: google.maps.marker.AdvancedMarkerElement[]

  calculateRentTotalPrice(): void {
    //this.rentTotalPrice = calculateCityBeePrice(this.carData, searchParamsObj)
    this.rentTotalPrice = 100
  }

  /**
   * @inheritdoc
   */
  getTotalPrice(): number {
    if (this.rentTotalPrice == undefined)
      throw 'Car total rent price is not calculated'
    return this.rentTotalPrice
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
    return this.carData.price.minute + ' min'
  }

  /**
   * @inheritdoc
   */
  getFormattedKilometrePrice(): string {
    return this.carData.price.km + ' km'
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {
    return CityBeeLogo
  }

  getCarImg(): string {
    switch (this.carData.name) {
      case 'Toyota Corolla':
        return VW_T_Cross
      case 'VW Crafter':
        return VW_Crafter
      case 'Toyota Yaris':
        return Toyota_Yaris
      case 'Skoda Fabia':
        return Skoda_Fabia
      case 'Nissan Juke':
        return Nissan_Juke
      case 'VW T-Cross':
        return VW_T_Cross
      case 'Toyota RAV4':
        return Toyota_RAV4
      case 'Toyota Yaris Cross':
        return Toyota_Yaris_Cross
      case 'Citroen C3':
        return Citroen_C3
      case 'VW T-Roc R-Line':
        return VW_T_Roc_R_Line
      case 'Renault Master':
        return Renault_Master
      case 'Ford Focus':
        return Ford_Focus
      case 'Ford Kuga':
        return Ford_Kuga
      case 'Jeep Compass':
        return Jeep_Compass
      case 'Ford Fiesta':
        return Ford_Fiesta
      case 'Skoda Kamiq':
        return Skoda_Kamiq
      case 'VW Taigo':
        return VW_Taigo
      case 'VW':
        return VW_Taigo
      case 'Toyota C-HR':
        return Toyota_C_HR
      case 'Nissan Qashqai':
        return Nissan_Qashqai
      case 'Renault Clio':
        return Renault_Clio
      case 'Renault Arkana':
        return Renult_Arkana
      case 'Ford Transit':
        return Ford_Transit
      case 'Kia Sportage':
        return Kia_Sportage
      case 'MAN TGE':
        return MAN_TGE
      case 'Opel Crossland ':
        return Opel_Crossland
      case 'Ford Focus Estate':
        return Ford_Focus_Estate
      case 'Fiat Multipla':
        return Fiat_Multipla
      case 'BMW 118i':
        return BMW_118i
      case 'Fiat 500e':
        return Fiat_500e
      case 'Peugeot 308':
        return Peugeot_308
      default:
        return No_image_available
    }
  }

  /**
   * @inheritdoc
   */
  getDetailedDialog(): { component: typeof SvelteComponent; props: object } {
    return {
      component: CityBeeCarPopover,
      props: {
        minimumFee: this.carData.price.min,
        startingFee: this.carData.price.start,
      },
    }
  }

  initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ): void {
    this.carData.coordinates.forEach(({ lat, lng }) => {
      const content = this.getMarkerRegularIcon()
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
    content.className = 'dot-icon bg-brand-citybee'

    return content
  }

  getMarkerPriceIcon(): HTMLDivElement {
    const content = document.createElement('div')
    content.className = 'dot-icon bg-brand-citybee'

    const priceIcon = document.createElement('div')
    priceIcon.className = 'price-icon'

    priceIcon.innerText = 10 + '€'
    priceIcon.appendChild(content)

    return priceIcon
  }
}
