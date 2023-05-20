import calculateBeastPrice from "../../helpers/Calculators/CalculateBeastPrice";
import type BaseCar from "./BaseCar";

import BeastLogo from '$lib/Images/beast.png';
import type {SvelteComponent} from "svelte";
import BeastCarPopover from "$lib/Popovers/BeastCarPopover.svelte";
import type {SearchParamsObj} from "../DTO/SearchParamsObj";
import type {Car} from "../DTO/Car";

class BeastCar implements BaseCar {

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
    this.rentTotalPrice = calculateBeastPrice(this.carData, JSON.parse(JSON.stringify(searchParamsObj)))
  }

  /**
   * @inheritdoc
   */
  getTotalPrice(): number {
    if (this.rentTotalPrice == undefined) throw "Car total rent price is not calculated"
    return this.rentTotalPrice;
  }

  /**
   * @inheritdoc
   */
  getFormattedTotalPrice(): string {

    return ( this.getTotalPrice()).toFixed(2) + " €";
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

    return this.carData.price.km + ' €/km after 300km';
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {

    return BeastLogo;
  }

  /**
   * @inheritdoc
   */
  getDetailedDialog(): { component: typeof SvelteComponent, props: object } {
    return {
      component: BeastCarPopover,
      props: {
        depositBase: 0,
        depositSpecial:0,
      }
    };
    // return {
    //   component: BeastCarPopover,
    //   props: {
    //     depositBase: this.carData.price.deposit.base,
    //     depositSpecial: this.carData.price.deposit.special,
    //   }
    // };
  }
}

export default BeastCar;