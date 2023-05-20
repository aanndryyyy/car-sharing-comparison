import type {PackageName} from "../Enums/PackageName";

export interface ICarRentPricePackage {
    name: PackageName;
    days: number;
    hours: number;
    distance: number;
    price: number;
}