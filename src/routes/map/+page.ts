/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { providerDetails } = await parent()

  return { providerDetails }
}
