import { SECRET_BACKEND_BASE_URL } from '$env/static/private'

export const GET = async ({ fetch }) => {
  return await fetch(SECRET_BACKEND_BASE_URL + 'location')
}
