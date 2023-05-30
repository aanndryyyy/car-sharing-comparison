import type { Car } from '$lib/Car/GenericCar.js'

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { cars } = await parent()

  return { cars } as {
    cars: Car[]
  }
}
