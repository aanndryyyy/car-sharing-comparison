import { SECRET_BACKEND_BASE_URL } from '$env/static/private'

export const config = {
  runtime: 'edge',
  regions: 'arn1',
}

export const GET = async ({ fetch }) => {
  return await fetch(SECRET_BACKEND_BASE_URL + 'location')
  // return await fetch(import.meta.env.BACKEND_API_URL + 'location')
}
