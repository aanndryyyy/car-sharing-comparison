import CityBeeLogo from '../../assets/images/providers/citybee/citybee-logo.png'
import type { ICarCityBee } from '$lib/Types/Interfaces/ICarCityBee'
import No_image_available from '../../assets/images/no-image-available.png'
import VW_Crafter from '../../assets/images/providers/citybee/cars/lowQuality/VW-Crafter.png'
import Toyota_Yaris from '../../assets/images/providers/citybee/cars/lowQuality/Toyota-Yaris.png'
import Skoda_Fabia from '../../assets/images/providers/citybee/cars/lowQuality/Skoda-Fabia.png'
import Nissan_Juke from '../../assets/images/providers/citybee/cars/lowQuality/Nissan-Juke.png'
import VW_T_Cross from '../../assets/images/providers/citybee/cars/lowQuality/VW-T-Cross.png'
import Toyota_RAV4 from '../../assets/images/providers/citybee/cars/lowQuality/Toyota-RAV4.png'
import Toyota_Corolla from '../../assets/images/providers/citybee/cars/lowQuality/Toyota-Corolla.png'
import Toyota_Yaris_Cross from '../../assets/images/providers/citybee/cars/lowQuality/Toyota-Yaris-Cross.png'
import Citroen_C3 from '../../assets/images/providers/citybee/cars/lowQuality/Citroen-C3.png'
import VW_T_Roc_R_Line from '../../assets/images/providers/citybee/cars/lowQuality/VW-T-Roc-R-Line.png'
import Renault_Master from '../../assets/images/providers/citybee/cars/lowQuality/Renault-Master.png'
import Ford_Focus from '../../assets/images/providers/citybee/cars/lowQuality/Ford-Focus.png'
import Ford_Kuga from '../../assets/images/providers/citybee/cars/lowQuality/Ford-Kuga.png'
import Jeep_Compass from '../../assets/images/providers/citybee/cars/lowQuality/Jeep-Compass.png'
import Ford_Fiesta from '../../assets/images/providers/citybee/cars/lowQuality/Ford-Fiesta.png'
import Skoda_Kamiq from '../../assets/images/providers/citybee/cars/lowQuality/Skoda-Kamiq.png'
import VW_Taigo from '../../assets/images/providers/citybee/cars/lowQuality/VW-Taigo.png'
import Toyota_C_HR from '../../assets/images/providers/citybee/cars/lowQuality/Toyota-C-HR.png'
import Nissan_Qashqai from '../../assets/images/providers/citybee/cars/lowQuality/Nissan-Qashqai.png'
import Renault_Clio from '../../assets/images/providers/citybee/cars/lowQuality/Renault-Clio.png'
import Renult_Arkana from '../../assets/images/providers/citybee/cars/lowQuality/Renult-Arkana.png'
import Ford_Transit from '../../assets/images/providers/citybee/cars/lowQuality/Ford-Transit.png'
import Kia_Sportage from '../../assets/images/providers/citybee/cars/lowQuality/Kia-Sportage.png'
import MAN_TGE from '../../assets/images/providers/citybee/cars/lowQuality/MAN-TGE.png'
import Opel_Crossland from '../../assets/images/providers/citybee/cars/lowQuality/Opel-Crossland.png'
import Ford_Focus_Estate from '../../assets/images/providers/citybee/cars/lowQuality/Ford-Focus-Estate.png'
import Fiat_Multipla from '../../assets/images/providers/citybee/cars/lowQuality/Fiat-Multipla.png'
import BMW_118i from '../../assets/images/providers/citybee/cars/lowQuality/BMW-118i.png'
import Fiat_500e from '../../assets/images/providers/citybee/cars/lowQuality/Fiat-500e.png'
import Peugeot_308 from '../../assets/images/providers/citybee/cars/lowQuality/Peugeot-308.png'
import GenericMappableCar from './GenericMappableCar'
import calculateCityBeePrice from '../../helpers/calculators/CalculateCityBeePrice'
import { SearchParamsObj } from '../DTO/SearchParamsObj'

export default class CityBeeCar extends GenericMappableCar<ICarCityBee> {
  calculateRentTotalPrice(searchParamsObj: SearchParamsObj): void {
    const { price, pricePackages } = calculateCityBeePrice(
      this.carData as ICarCityBee,
      searchParamsObj
    )
    this.rentTotalPrice = price
    this.rentUsablePackages = pricePackages
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
        return Toyota_Corolla
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

  initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ): void {
    this.carData.coordinates.forEach(({ lat, lng }) => {
      const marker = new AdvancedMarkerElement({
        map,
        content: this.getMarkerDotIcon(),
        position: { lat, lng },
      })

      this.markers.push(marker)
    })
  }

  setMarkerIcons(type?: 'price') {
    this.markers.forEach((marker) => {
      this.setMarkerIcon(marker, type)
    })
  }

  setMarkerIcon(
    marker: google.maps.marker.AdvancedMarkerElement,
    type?: 'price'
  ) {
    switch (type) {
      case 'price':
        marker.content = this.getMarkerPriceIcon()
        break

      default:
        marker.content = this.getMarkerDotIcon()
        break
    }
  }

  getMarkerDotIcon(): Element {
    const content = document.createElement('div')
    content.className = 'dot-icon bg-brand-citybee'

    return content
  }

  getMarkerPriceIcon(): Element {
    const content = document.createElement('div')
    content.className = 'dot-icon bg-brand-citybee'

    const priceIcon = document.createElement('div')
    priceIcon.className = 'price-icon'

    priceIcon.innerText = this.getTotalPrice().toFixed(0) + '€'
    priceIcon.appendChild(content)

    return priceIcon
  }
}
