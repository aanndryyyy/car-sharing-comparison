import type {IElmoPackageCalculatingData} from "../Types/Interfaces/IElmoPackageCalculatingData";
import {CarRentPricePackage} from "./CarRentPricePackage";
import {CarRentPrice} from "./CarRentPrice";

export class ElmoPackageCalculatingData implements IElmoPackageCalculatingData{
    timeLeft = 0;
    distanceLeft = 0;
    months = 0;
    weeks = 0;
    onlyWeeks = false;
    totalCost = 0;
    price = new CarRentPrice();
    weekPrice = new CarRentPricePackage();
    monthPrice = new CarRentPricePackage();
}