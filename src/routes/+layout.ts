export const prerender = true
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'

interface apiLocationResponse {
  provider: string
  services: {
    name: string
    price: {}
    coordinates: {
      lat: number
      lng: number
    }[]
  }[]
}

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(PUBLIC_BACKEND_BASE_URL + 'location')
  const providerDetails = (await response.json()) as apiLocationResponse[]

  return {
    providerDetails,
  }
}
