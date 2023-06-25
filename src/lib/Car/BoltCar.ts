import BoltLogo from '../../assets/images/providers/bolt/bolt-logo.png'
import calculateBoltPrice from '../../helpers/calculators/calculateBoltPrice'
import type { ICarBolt } from '$lib/Types/Interfaces/ICarBolt'

import No_image_available from '../../assets/images/no-image-available.png'
import Audi_A1 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-A1.png'
import Audi_A3 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-A3.png'
import Audi_A4 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-A4.png'
import Audi_A5 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-A5.png'
import Audi_e_tron from '../../assets/images/providers/bolt/cars/lowQuality/Audi-e-tron.png'
import Audi_Q2 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-Q2.png'
import Audi_Q5 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-Q5.png'
import Audi_Q8 from '../../assets/images/providers/bolt/cars/lowQuality/Audi-Q8.png'
import BMW_4_Convertible from '../../assets/images/providers/bolt/cars/lowQuality/BMW-4-Convertible.png'
import BMW_4_Coupe from '../../assets/images/providers/bolt/cars/lowQuality/BMW-4-Coupe.png'
import BMW_520d from '../../assets/images/providers/bolt/cars/lowQuality/Hyundai-i30.png'
import Hyundai_i20 from '../../assets/images/providers/bolt/cars/lowQuality/Hyundai-i20.png'
import Hyundai_i30 from '../../assets/images/providers/bolt/cars/lowQuality/Hyundai-i30.png'
import Kia_Picanto from '../../assets/images/providers/bolt/cars/lowQuality/Kia-Picanto.png'
import Mercedes_Sprinter from '../../assets/images/providers/bolt/cars/lowQuality/Mercedes-Sprinter.png'
import Peugeot_208 from '../../assets/images/providers/bolt/cars/lowQuality/Peugeot-208.png'
import Peugeot_2008 from '../../assets/images/providers/bolt/cars/lowQuality/Peugeot-2008.png'
import Peugeot_3008 from '../../assets/images/providers/bolt/cars/lowQuality/Peugeot-3008.png'
import Porsche_Taycan from '../../assets/images/providers/bolt/cars/lowQuality/Porsche-Taycan.png'
import Renault_Captur from '../../assets/images/providers/bolt/cars/lowQuality/Renault-Captur.png'
import Renault_Megane_E_Tech from '../../assets/images/providers/bolt/cars/lowQuality/Renault-Megane-E-Tech.png'
import Skoda_Fabia from '../../assets/images/providers/bolt/cars/lowQuality/Skoda-Fabia.png'
import Skoda_Kamiq from '../../assets/images/providers/bolt/cars/lowQuality/Skoda-Kamiq.png'
import Skoda_Scala from '../../assets/images/providers/bolt/cars/lowQuality/Skoda-Scala.png'
import Tesla_Model_Y from '../../assets/images/providers/bolt/cars/lowQuality/Tesla-Model-Y.png'
import Toyota_C_HR from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-C-HR.png'
import Toyota_Corolla from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-Corolla.png'
import Toyota_Highlander from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-Highlander.png'
import Toyota_Land_Cruiser from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-Land-Cruiser.png'
import Toyota_RAV4 from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-RAV4.png'
import Toyota_Yaris from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-Yaris.png'
import Toyota_Yaris_Cross from '../../assets/images/providers/bolt/cars/lowQuality/Toyota-Yaris-Cross.png'
import VW_Arteon from '../../assets/images/providers/bolt/cars/lowQuality/VW-Arteon.png'
import VW_e_Crafter from '../../assets/images/providers/bolt/cars/lowQuality/VW-e-Crafter.png'
import VW_ID3 from '../../assets/images/providers/bolt/cars/lowQuality/VW-ID3.png'
import VW_T_Cross from '../../assets/images/providers/bolt/cars/lowQuality/VW-T-Cross.png'
import VW_T_Roc from '../../assets/images/providers/bolt/cars/lowQuality/VW-T-Roc.png'
import VW_T_Roc_Cabrio from '../../assets/images/providers/bolt/cars/lowQuality/VW-T-Roc-Cabrio.png'
import GenericCar from './GenericCar'
import GenericMappableCar from './GenericMappableCar'
import { SearchParamsObj } from '../DTO/SearchParamsObj'

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
