import type { BeastCarObject } from "./BeastCar";
import type { BoltCarObject } from "./BoltCar";
import type { CityBeeCarObject } from "./CityBeeCar";
import type { ElmoCarObject } from "./ElmoCar";

/**
 * Defines a standard format for each company car so 
 * prices can be easily compared.
 */
export default interface BaseCar {

  readonly carData: BoltCarObject | CityBeeCarObject | ElmoCarObject | BeastCarObject;

  /**
   * Get the name.
   * 
   * @return The name.
   */
  getName(): string;

  /**
   * The total price in number format, for sorting and etc.
   * 
   * @param minutes Total minutes.
   * @param distance Total distance.
   * 
   * @returns The price.
   */
  getTotalPrice( minutes: number, distance: number ): number;

  /**
   * The total price as formatted text.
   * 
   * @param minutes Total minutes.
   * @param distance Total distance.
   * 
   * @returns Formatted price.
   */
  getFormattedTotalPrice( minutes: number, distance: number ): string;
}
