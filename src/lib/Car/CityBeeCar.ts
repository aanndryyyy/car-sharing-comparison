import type { ICarCityBee } from '$lib/Types/Interfaces/ICarCityBee'
import GenericMappableCar from './GenericMappableCar'
import calculateCityBeePrice from '../../helpers/calculators/calculateCityBeePrice'
import { SearchParamsObj } from '../DTO/SearchParamsObj'

import CityBeeLogo from '../../assets/images/providers/citybee/citybee-logo.png?url&format=webp'
import No_image_available from '../../assets/images/no-image-available.png?url&h=112&format=webp'
import VW_Crafter from '../../assets/images/providers/citybee/cars/lowQuality/VW-Crafter.png?url&h=112&format=webp'
import Toyota_Yaris from '../../assets/images/providers/citybee/cars/lowQuality/Toyota-Yaris.png?url&h=112&format=webp'
import Skoda_Fabia from '../../assets/images/providers/citybee/cars/lowQuality/Skoda-Fabia.png?url&h=112&format=webp'
import Nissan_Juke from '../../assets/images/providers/citybee/cars/lowQuality/Nissan-Juke.png?url&h=112&format=webp'
import VW_T_Cross from '../../assets/images/providers/citybee/cars/lowQuality/VW-T-Cross.png?url&h=112&format=webp'
import Toyota_RAV4 from '../../assets/images/providers/citybee/cars/lowQuality/Toyota-RAV4.png?url&h=112&format=webp'
import Toyota_Corolla from '../../assets/images/providers/citybee/cars/lowQuality/Toyota-Corolla.png?url&h=112&format=webp'
import Toyota_Yaris_Cross from '../../assets/images/providers/citybee/cars/lowQuality/Toyota-Yaris-Cross.png?url&h=112&format=webp'
import Citroen_C3 from '../../assets/images/providers/citybee/cars/lowQuality/Citroen-C3.png?url&h=112&format=webp'
import VW_T_Roc_R_Line from '../../assets/images/providers/citybee/cars/lowQuality/VW-T-Roc-R-Line.png?url&h=112&format=webp'
import Renault_Master from '../../assets/images/providers/citybee/cars/lowQuality/Renault-Master.png?url&h=112&format=webp'
import Ford_Focus from '../../assets/images/providers/citybee/cars/lowQuality/Ford-Focus.png?url&h=112&format=webp'
import Ford_Focus_Wagon from '../../assets/images/providers/citybee/cars/lowQuality/Ford-Focus-Wagon.png?url&h=112&format=webp'
import Ford_Kuga from '../../assets/images/providers/citybee/cars/lowQuality/Ford-Kuga.png?url&h=112&format=webp'
import Jeep_Compass from '../../assets/images/providers/citybee/cars/lowQuality/Jeep-Compass.png?url&h=112&format=webp'
import Ford_Fiesta from '../../assets/images/providers/citybee/cars/lowQuality/Ford-Fiesta.png?url&h=112&format=webp'
import Skoda_Kamiq from '../../assets/images/providers/citybee/cars/lowQuality/Skoda-Kamiq.png?url&h=112&format=webp'
import Skoda_Karoq from '../../assets/images/providers/citybee/cars/lowQuality/Skoda-Karoq.png?url&h=112&format=webp'
import VW_Taigo from '../../assets/images/providers/citybee/cars/lowQuality/VW-Taigo.png?url&h=112&format=webp'
import Toyota_C_HR from '../../assets/images/providers/citybee/cars/lowQuality/Toyota-C-HR.png?url&h=112&format=webp'
import Nissan_Qashqai from '../../assets/images/providers/citybee/cars/lowQuality/Nissan-Qashqai.png?url&h=112&format=webp'
import Renault_Clio from '../../assets/images/providers/citybee/cars/lowQuality/Renault-Clio.png?url&h=112&format=webp'
import Renult_Arkana from '../../assets/images/providers/citybee/cars/lowQuality/Renult-Arkana.png?url&h=112&format=webp'
import Ford_Transit from '../../assets/images/providers/citybee/cars/lowQuality/Ford-Transit.png?url&h=112&format=webp'
import Kia_Sportage from '../../assets/images/providers/citybee/cars/lowQuality/Kia-Sportage.png?url&h=112&format=webp'
import MAN_TGE from '../../assets/images/providers/citybee/cars/lowQuality/MAN-TGE.png?url&h=112&format=webp'
import Opel_Crossland from '../../assets/images/providers/citybee/cars/lowQuality/Opel-Crossland.png?url&h=112&format=webp'
import Ford_Focus_Estate from '../../assets/images/providers/citybee/cars/lowQuality/Ford-Focus-Estate.png?url&h=112&format=webp'
import Fiat_Multipla from '../../assets/images/providers/citybee/cars/lowQuality/Fiat-Multipla.png?url&h=112&format=webp'
import BMW_118i from '../../assets/images/providers/citybee/cars/lowQuality/BMW-118i.png?url&h=112&format=webp'
import Fiat_500e from '../../assets/images/providers/citybee/cars/lowQuality/Fiat-500e.png?url&h=112&format=webp'
import Peugeot_308 from '../../assets/images/providers/citybee/cars/lowQuality/Peugeot-308.png?url&h=112&format=webp'
import Porsche_Taycan from '../../assets/images/providers/citybee/cars/lowQuality/Porsche-Taycan.png?url&h=112&format=webp'
import VW_Tiguan from '../../assets/images/providers/citybee/cars/lowQuality/VW-Tiguan.png?url&h=112&format=webp'
import Toyota_Corolla_Touring from '../../assets/images/providers/citybee/cars/lowQuality/Toyota-Corolla-Touring.png?url&h=112&format=webp'

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
      case 'Ford Focus Wagon':
        return Ford_Focus_Wagon
      case 'Ford Kuga':
        return Ford_Kuga
      case 'Jeep Compass':
        return Jeep_Compass
      case 'Ford Fiesta':
        return Ford_Fiesta
      case 'Skoda Kamiq':
        return Skoda_Kamiq
      case 'Skoda Karoq':
        return Skoda_Karoq
      case 'VW Taigo':
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
      case 'Porsche Taycan':
        return Porsche_Taycan
      case 'VW Tiguan':
        return VW_Tiguan
      case 'Toyota Corolla Touring':
        return Toyota_Corolla_Touring
      default:
        return No_image_available
    }
  }
}
