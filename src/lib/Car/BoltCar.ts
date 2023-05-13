import type BaseCar from "./BaseCar";

import BoltLogo from '$lib/Images/bolt.png';
import type {SvelteComponent} from "svelte";
import BoltCarPopover from "$lib/Popovers/BoltCarPopover.svelte";
import type {SearchParamsObj} from "../DTO/SearchParamsObj";
import calculateBoltPrice from "../../helpers/Calculators/CalculateBoltPrice";
import type {Car} from "../DTO/Car";

class BoltCar implements BaseCar {

  readonly carData;
  rentTotalPrice: number | undefined;

  /**
   * Initialise car data.
   * 
   * @param car The car object.
   */
  constructor( car: Car ) {
    
    this.carData = car;
  }

  /**
   * @inheritdoc
   */
  getName(): string {
    
    return this.carData.name;
  }

  /**
   * @inheritdoc
   */
  calculateRentTotalPrice(searchParamsObj: SearchParamsObj): void {
    this.rentTotalPrice = calculateBoltPrice(this.carData, JSON.parse(JSON.stringify(searchParamsObj)))
  }
  
  /**
   * @inheritdoc
   */
  getTotalPrice(): number {
    if (this.rentTotalPrice == undefined) throw "Car total rent price is not calculated"
    return this.rentTotalPrice
  }

  /**
   * @inheritdoc
   */
  getFormattedTotalPrice(): string {

    return ( this.getTotalPrice() ).toFixed(2) + " €";
  }

  /**
   * @inheritdoc
   */
  getFormattedLongTermDiscount(): string {

    return "TODO"
    // return ( this.getTotalPrice() - this.carData.price.minute * searchParamsObj.minutes ).toFixed(2) + " €";
  }

  /**
   * @inheritdoc
   */
  getFormattedMinutePrice(): string {

    return this.carData.price.minute + ' €/min';
  } 

  /**
   * @inheritdoc
   */
  getFormattedKilometrePrice(): string {

    return this.carData.price.km + ' €/min';
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {

    return BoltLogo;
  }

  getCarImg(): string {
    // temp
    return "https://citybee.ee/wp-content/uploads/2021/08/CityBee_ToyotaYaris_EE-1024x605.png"
  }

  /**
   * @inheritdoc
   */
  getDetailedDialog(): { component: typeof SvelteComponent, props: object } {

    return {
      component: BoltCarPopover,
      props: {
        minimumFee: this.carData.price.min,
      }
    };
  }
}

export default BoltCar;