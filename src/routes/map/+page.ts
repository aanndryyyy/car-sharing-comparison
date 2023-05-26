/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { cars } = await parent()

  return { cars }
}
