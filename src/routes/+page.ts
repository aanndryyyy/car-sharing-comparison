import BoltCar from "$lib/Car/BoltCar";
import CityBeeCar from "$lib/Car/CityBeeCar";
import ElmoCar from "$lib/Car/ElmoCar";
import BeastCar from "$lib/Car/BeastCar";
import type {Car} from "$lib/DTO/Car";

/** @type {import('./$types').PageLoad} */
// @ts-ignore
export async function load({ fetch }) {

  const boltData          = await fetch('data/bolt.json');
  const rawBoltCars       = await boltData.json();
  let boltCars: BoltCar[] = [];

  rawBoltCars.forEach( ( rawBoltCar: Car ) => {
    boltCars.push( new BoltCar( rawBoltCar ) );
  });

  const cityBeeData = await fetch('data/citybee.json');
  const rawCityBeeCars = await cityBeeData.json();
  let cityBeeCars: CityBeeCar[] = [];

  rawCityBeeCars.forEach( ( rawBoltCar: Car ) => {
    cityBeeCars.push( new CityBeeCar( rawBoltCar ) );
  });

  const elmoData = await fetch('data/elmo.json');
  const rawElmoCars = await elmoData.json();
  let elmoCars: ElmoCar[] = [];

  rawElmoCars.forEach( ( rawCar: Car ) => {
    elmoCars.push( new ElmoCar( rawCar ) );
  });

  const beastData = await fetch('data/beast.json');
  const rawBeastCars = await beastData.json();
  let beastCars: BeastCar[] = [];

  rawBeastCars.forEach( ( rawCar: Car ) => {
    beastCars.push( new BeastCar( rawCar ) );
  });


  return {
    boltCars,
    cityBeeCars,
    elmoCars,
    beastCars,
  };
}
