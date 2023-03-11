import type BaseCar from "./BaseCar";
import { breakdownMinutes } from "../Time";

import BeastLogo from '$lib/Images/beast.png';

type BeastCarObject = {
  name: string,
  price: {
    km: number,
    minute: number,
    day: number,
    threeDays: number,
    week: number,
    start: number,
    deposit: {
      base: number,
      special: number,
    },
  },
}

class BeastCar implements BaseCar {

  readonly carData: BeastCarObject;

  /**
   * Initialise car data.
   * 
   * @param car The car object.
   */
  constructor( car: BeastCarObject ) {
    
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
  getTotalPrice( minutes: number, distance: number ): number {

    let duration = breakdownMinutes( minutes );

    if ( ( duration.minutes + duration.hours*60 ) * this.carData.price.minute >= this.carData.price.day ) {
      
      duration.days++;
      duration.hours   = 0;
      duration.minutes = 0;
    }

    // TODO: if 3 day max.
    // TODO: if week max.

    let kilometrePrice = 0;

    if ( kilometrePrice > 300 ) {
      kilometrePrice = this.carData.price.km;
    }

    let durationPrice = duration.minutes * this.carData.price.minute + (duration.hours*60) * this.carData.price.minute + duration.days * this.carData.price.day;
    let total         = durationPrice + distance*kilometrePrice;

    return total + this.carData.price.start;
  }

  /**
   * @inheritdoc
   */
  getFormattedTotalPrice( minutes: number, distance: number ): string {

    return ( this.getTotalPrice( minutes, distance ) ).toFixed(2) + " € (+" + this.carData.price.deposit.base + " €)";
  }

  /**
   * @inheritdoc
   */
  getFormattedLongTermDiscount( minutes: number, distance: number ): string {

    return ( this.getTotalPrice( minutes, distance ) - this.carData.price.minute*minutes ).toFixed(2) + " €";
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

    return BeastLogo;
  }
}

export type { BeastCarObject };
export default BeastCar;