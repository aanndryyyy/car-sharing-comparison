import GenericCar from './GenericCar'
import type { ICarElmo } from '$lib/Types/Interfaces/ICarElmo'
import { SearchParamsObj } from '../DTO/SearchParamsObj'
import calculateElmoPrice from '../../helpers/calculators/calculateElmoPrice'

import ElmoLogo from '../../assets/images/providers/elmo/elmo-logo.png?url&format=webp'
import No_image_available from '../../assets/images/no-image-available.png?url&h=112&format=webp'
import Nissan_Leaf from '../../assets/images/providers/elmo/cars/lowQuality/Nissan-Leaf.png?url&h=112&format=webp'
import Peugeot_e_208_GT from '../../assets/images/providers/elmo/cars/lowQuality/Peugeot-e-208-GT.png?url&h=112&format=webp'
import Renault_Arkana_Hybrid from '../../assets/images/providers/elmo/cars/lowQuality/Renault-Arkana-Hybrid.png?url&h=112&format=webp'
import Renault_Clio_Hybrid from '../../assets/images/providers/elmo/cars/lowQuality/Renault-Clio-Hybrid.png?url&h=112&format=webp'
import Renault_Zoe from '../../assets/images/providers/elmo/cars/lowQuality/Renault-Zoe.png?url&h=112&format=webp'
import Skoda_Citigo from '../../assets/images/providers/elmo/cars/lowQuality/Skoda-Citigo.png?url&h=112&format=webp'
import Tesla_Model_3_SR from '../../assets/images/providers/elmo/cars/lowQuality/Tesla-Model-3-SR+.png?url&h=112&format=webp'
import Tesla_Model_Y from '../../assets/images/providers/elmo/cars/lowQuality/Tesla-Model-Y.png?url&h=112&format=webp'
import Toyota_Yaris_Hybrid from '../../assets/images/providers/elmo/cars/lowQuality/Toyota-Yaris-Hybrid.png?url&h=112&format=webp'
import VW_e_Up20 from '../../assets/images/providers/elmo/cars/lowQuality/VW-e-Up20.png?url&h=112&format=webp'

export default class ElmoCar extends GenericCar<ICarElmo> {
  calculateRentTotalPrice(searchParamsObj: SearchParamsObj): void {
    this.rentTotalPrice = calculateElmoPrice(
      this.carData as ICarElmo,
      searchParamsObj
    )
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {
    return ElmoLogo
  }

  getCarImg(): string {
    switch (this.carData.name) {
      case "Volkswagen e-Up!'19":
        return VW_e_Up20
      case 'Skoda Citigo':
        return Skoda_Citigo
      case 'Toyota Yaris Hybrid':
        return Toyota_Yaris_Hybrid
      case 'Renault Clio Hybrid 2021':
        return Renault_Clio_Hybrid
      case 'Nissan Leaf':
        return Nissan_Leaf
      case 'Peugeot e208 GT':
        return Peugeot_e_208_GT
      case 'Renault Arkana Hybrid':
        return Renault_Arkana_Hybrid
      case 'Renault Zoe':
        return Renault_Zoe
      case 'Tesla Model 3':
        return Tesla_Model_3_SR
      case 'Tesla Model Y':
        return Tesla_Model_Y
      default:
        return No_image_available
    }
  }

  initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ): void {}
}
