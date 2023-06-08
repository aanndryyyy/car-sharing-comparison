import calculateBeastPrice from '../../helpers/calculators/calculateBeastPrice'
import GenericCar from './GenericCar'

import BeastLogo from '../../assets/images/providers/beast/beast-logo.png'
import type { ICarBeast } from '$lib/Types/Interfaces/ICarBeast'
import No_image_available from '../../assets/images/no-image-available.png'
import Tesla_Model_3_Long_Range from '../../assets/images/providers/beast/cars/lowQuality/Tesla-Model-3-Long-Range.png'
import Tesla_Model_3_Standard_Range from '../../assets/images/providers/beast/cars/lowQuality/Tesla-Model-3-Standard-Range.png'
import Tesla_Model_3_Performance from '../../assets/images/providers/beast/cars/lowQuality/Tesla-Model-3-Performance.png'
import Tesla_Model_X_Performance from '../../assets/images/providers/beast/cars/lowQuality/Tesla-Model-X-Performance.png'
import Tesla_Model_Y_Long_Range from '../../assets/images/providers/beast/cars/lowQuality/Tesla-Model-Y-Long-Range.png'
import Tesla_Model_S from '../../assets/images/providers/beast/cars/lowQuality/Tesla-Model-S.png'
import { SearchParamsObj } from '../DTO/SearchParamsObj'

export default class BeastCar extends GenericCar<ICarBeast> {
  /**
   * @inheritdoc
   */
  calculateRentTotalPrice(searchParamsObj: SearchParamsObj): void {
    this.rentTotalPrice = calculateBeastPrice(
      this.carData as ICarBeast,
      searchParamsObj
    )
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {
    return BeastLogo
  }

  getCarImg(): string {
    switch (this.carData.name) {
      case 'Model 3 Standard Range':
        return Tesla_Model_3_Standard_Range
      case 'Model 3 Long Range':
        return Tesla_Model_3_Long_Range
      case 'Model 3 Performance':
        return Tesla_Model_3_Performance
      case 'Model Y Long Range':
        return Tesla_Model_Y_Long_Range
      case 'Model S Standard Range':
        return Tesla_Model_S
      case 'Model Y Performance':
        return Tesla_Model_Y_Long_Range
      case 'Model S Performance':
        return Tesla_Model_S
      case 'Model X Performance':
        return Tesla_Model_X_Performance
      default:
        return No_image_available
    }
  }

  initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ): void {}
}
