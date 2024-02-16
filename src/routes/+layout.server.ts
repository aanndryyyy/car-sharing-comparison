import type { Provider } from '$lib/types'

export async function load({ fetch }) {
  const getAllProviders = async (): Promise<Provider[]> => {
    const response = await fetch('/api/location')
    return await response.json()
  }

  return {
    allProviders: await getAllProviders(),
  }
}
