import { SECRET_BACKEND_BASE_URL } from '$env/static/private'

export const GET = async () => {
  return await fetch(SECRET_BACKEND_BASE_URL + 'location')
}
