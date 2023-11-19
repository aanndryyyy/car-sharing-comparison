import GenericMappableCar from './GenericMappableCar'
import { SearchParamsObj } from '../DTO/SearchParamsObj'
import calculateBoltPrice from '../../helpers/calculators/calculateBoltPrice'
import type { ICarBolt } from '$lib/Types/Interfaces/ICarBolt'

import BoltLogo from '../../assets/images/providers/bolt/bolt-logo.png?url&format=webp'
import No_image_available from '../../assets/images/no-image-available.png?url&h=112&format=webp'
import Audi_A1 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-A1.png?url&h=112&format=webp'
import Audi_A3 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-A3.png?url&h=112&format=webp'
import Audi_A3_Sedan from '../../assets/images/providers/bolt/cars/lowQuality/Audi-A3-Sedan.png?url&h=112&format=webp'
import Audi_A4 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-A4.png?url&h=112&format=webp'
import Audi_A5 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-A5.png?url&h=112&format=webp'
import Audi_e_tron from '../../assets/images/providers/bolt/cars/lowQuality/Audi-e-tron.png?url&h=112&format=webp'
import Audi_Q2 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-Q2.png?url&h=112&format=webp'
import Audi_Q5 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-Q5.png?url&h=112&format=webp'
import Audi_Q8 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-Q8.png?url&h=112&format=webp'
import BMW_4_Convertible from '../../assets/images/providers/bolt/cars/lowQuality/BMW-4-Convertible.png?url&h=112&format=webp'
import BMW_4_Coupe from '../../assets/images/providers/bolt/cars/lowQuality/BMW-4-Coupe.png?url&h=112&format=webp'
import BMW_520d from '../../assets/images/providers/bolt/cars/lowQuality/Hyundai-i30.png?url&h=112&format=webp'
import Hyundai_i20 from '../../assets/images/providers/bolt/cars/lowQuality/Hyundai-i20.png?url&h=112&format=webp'
import Hyundai_i30 from '../../assets/images/providers/bolt/cars/lowQuality/Hyundai-i30.png?url&h=112&format=webp'
import Kia_Picanto from '../../assets/images/providers/bolt/cars/lowQuality/Kia-Picanto.png?url&h=112&format=webp'
import Mercedes_Sprinter from '../../assets/images/providers/bolt/cars/lowQuality/Mercedes-Sprinter.png?url&h=112&format=webp'
import Peugeot_208 from '../../assets/images/providers/bolt/cars/lowQuality/Peugeot-208.png?url&h=112&format=webp'
import Peugeot_2008 from '../../assets/images/providers/bolt/cars/lowQuality/Peugeot-2008.png?url&h=112&format=webp'
import Peugeot_3008 from '../../assets/images/providers/bolt/cars/lowQuality/Peugeot-3008.png?url&h=112&format=webp'
import Porsche_Taycan from '../../assets/images/providers/bolt/cars/lowQuality/Porsche-Taycan.png?url&h=112&format=webp'
import Renault_Captur from '../../assets/images/providers/bolt/cars/lowQuality/Renault-Captur.png?url&h=112&format=webp'
import Renault_Megane_E_Tech from '../../assets/images/providers/bolt/cars/lowQuality/Renault-Megane-E-Tech.png?url&h=112&format=webp'
import Skoda_Fabia from '../../assets/images/providers/bolt/cars/lowQuality/Skoda-Fabia.png?url&h=112&format=webp'
import Skoda_Kamiq from '../../assets/images/providers/bolt/cars/lowQuality/Skoda-Kamiq.png?url&h=112&format=webp'
import Skoda_Scala from '../../assets/images/providers/bolt/cars/lowQuality/Skoda-Scala.png?url&h=112&format=webp'
import Tesla_Model_Y from '../../assets/images/providers/bolt/cars/lowQuality/Tesla-Model-Y.png?url&h=112&format=webp'
import Toyota_C_HR from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-C-HR.png?url&h=112&format=webp'
import Toyota_Corolla from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-Corolla.png?url&h=112&format=webp'
import Toyota_Highlander from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-Highlander.png?url&h=112&format=webp'
import Toyota_Land_Cruiser from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-Land-Cruiser.png?url&h=112&format=webp'
import Toyota_RAV4 from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-RAV4.png?url&h=112&format=webp'
import Toyota_Yaris from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-Yaris.png?url&h=112&format=webp'
import Toyota_Yaris_Cross from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-Yaris-Cross.png?url&h=112&format=webp'
import VW_Arteon from '../../assets/images/providers/bolt/cars/lowQuality/VW-Arteon.png?url&h=112&format=webp'
import VW_e_Crafter from '../../assets/images/providers/bolt/cars/lowQuality/VW-e-Crafter.png?url&h=112&format=webp'
import VW_ID3 from '../../assets/images/providers/bolt/cars/lowQuality/VW-ID3.png?url&h=112&format=webp'
import VW_T_Cross from '../../assets/images/providers/bolt/cars/lowQuality/VW-T-Cross.png?url&h=112&format=webp'
import VW_T_Roc from '../../assets/images/providers/bolt/cars/lowQuality/VW-T-Roc.png?url&h=112&format=webp'
import VW_T_Roc_Cabrio from '../../assets/images/providers/bolt/cars/lowQuality/VW-T-Roc-Cabrio.png?url&h=112&format=webp'

export default class BoltCar extends GenericMappableCar<ICarBolt> {
  /**
   * @inheritdoc
   */
  calculateRentTotalPrice(searchParamsObj: SearchParamsObj): void {
    this.rentTotalPrice = calculateBoltPrice(this.carData, searchParamsObj)
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {
    return BoltLogo
  }

  getCarImg(): string {
    switch (this.carData.name) {
      case 'VW T-Cross':
        return VW_T_Cross
      case 'Toyota Yaris':
        return Toyota_Yaris
      case 'Toyota C-HR':
        return Toyota_C_HR
      case 'VW T-Roc':
        return VW_T_Roc
      case 'VW Arteon':
        return VW_Arteon
      case 'VW Crafter':
        return VW_e_Crafter
      case 'VW e-Crafter':
        return VW_e_Crafter
      case 'VW T-Roc Cabrio':
        return VW_T_Roc_Cabrio
      case 'Toyota Land Cruiser':
        return Toyota_Land_Cruiser
      case 'Audi A1':
        return Audi_A1
      case 'Audi A3':
        return Audi_A3
      case 'Audi A3 Sedan':
        return Audi_A3_Sedan
      case 'Audi Q2':
        return Audi_Q2
      case 'Audi e-tron':
        return Audi_e_tron
      case 'BMW 4 Convertible':
        return BMW_4_Convertible
      case 'BMW 4 Coupe':
        return BMW_4_Coupe
      case 'BMW 520d':
        return BMW_520d
      case 'Škoda Fabia':
        return Skoda_Fabia
      case 'Hyundai i20':
        return Hyundai_i20
      case 'Hyundai i30':
        return Hyundai_i30
      case 'Mercedes Sprinter':
        return Mercedes_Sprinter
      case 'Toyota Corolla':
        return Toyota_Corolla
      case 'Toyota Yaris Cross':
        return Toyota_Yaris_Cross
      case 'Škoda Scala':
        return Skoda_Scala
      case 'Toyota Highlander':
        return Toyota_Highlander
      case 'Škoda Kamiq':
        return Skoda_Kamiq
      case 'Kia Picanto':
        return Kia_Picanto
      case 'Renault Captur':
        return Renault_Captur
      case 'Tesla Model Y':
        return Tesla_Model_Y
      case 'Audi A4':
        return Audi_A4
      case 'Audi A5':
        return Audi_A5
      case 'Porsche Taycan':
        return Porsche_Taycan
      case 'Renault Megane E-Tech':
        return Renault_Megane_E_Tech
      case 'Peugeot 208':
        return Peugeot_208
      case 'Peugeot 2008':
        return Peugeot_2008
      case 'Peugeot 3008':
        return Peugeot_3008
      default:
        return No_image_available
    }
  }
}
