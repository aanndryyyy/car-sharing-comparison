import BoltCar from "$lib/BoltCar";
import type { BoltCarObject } from "$lib/BoltCar";

import CityBeeCar from "$lib/CityBeeCar";
import type { CityBeeCarObject } from "$lib/CityBeeCar";

import ElmoCar from "$lib/ElmoCar";
import type { ElmoCarObject } from "$lib/ElmoCar";

import BeastCar from "$lib/BeastCar";
import type { BeastCarObject } from "$lib/BeastCar";


/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {

  const boltData          = await fetch('data/bolt.json');
  const rawBoltCars       = await boltData.json();
  let boltCars: BoltCar[] = [];

  rawBoltCars.forEach( ( rawBoltCar: BoltCarObject ) => {
    boltCars.push( new BoltCar( rawBoltCar ) );
  });

  const cityBeeData = await fetch('data/citybee.json');
  const rawCityBeeCars = await cityBeeData.json();
  let cityBeeCars: CityBeeCar[] = [];

  rawCityBeeCars.forEach( ( rawBoltCar: CityBeeCarObject ) => {
    cityBeeCars.push( new CityBeeCar( rawBoltCar ) );
  });

  const elmoData = await fetch('data/elmo.json');
  const rawElmoCars = await elmoData.json();
  let elmoCars: ElmoCar[] = [];

  rawElmoCars.forEach( ( rawCar: ElmoCarObject ) => {
    elmoCars.push( new ElmoCar( rawCar ) );
  });

  const beastData = await fetch('data/beast.json');
  const rawBeastCars = await beastData.json();
  let beastCars: BeastCar[] = [];

  rawBeastCars.forEach( ( rawCar: BeastCarObject ) => {
    beastCars.push( new BeastCar( rawCar ) );
  });


  return {
    boltCars,
    cityBeeCars,
    elmoCars,
    beastCars,
  };
}
