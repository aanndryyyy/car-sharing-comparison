import type BaseCar from "./BaseCar";
import { breakdownMinutes } from "./Time";

type CityBeeCarObject = {
  name: string,
  type: string,
  price: {
    km: number,
    minute: number,
    hour: number,
    day: number,
    minimum: number,
    start: number,
  },
}

class CityBeeCar implements BaseCar {

  readonly carData: CityBeeCarObject;

  /**
   * Initialise car data.
   * 
   * @param car The car object.
   */
  constructor( car: CityBeeCarObject ) {
    
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
    
    if ( duration.minutes*this.carData.price.minute >= this.carData.price.hour ) {
      
      duration.hours++;
      duration.minutes = 0;
    }

    let durationPrice = duration.days*this.carData.price.day + duration.hours*this.carData.price.hour + duration.minutes*this.carData.price.minute;
    let total         = durationPrice + distance*this.carData.price.km;

    if ( total <= this.carData.price.minimum ) {
      return this.carData.price.minimum;
    }

    return total + this.carData.price.start;
  }

  /**
   * @inheritdoc
   */
  getFormattedTotalPrice( minutes: number, distance: number ): string {

    return ( this.getTotalPrice( minutes, distance ) ).toFixed(2) + " €";
  }
}

export type { CityBeeCarObject };
export default CityBeeCar;