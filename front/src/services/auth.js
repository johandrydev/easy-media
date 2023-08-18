import { request } from './request'

export const loginRequest = async (data) => {
  try {
    const response = await request({
      endpoint: '/login',
      data,
      method: 'POST'
    })
    const json = await response.json()
    if (!response.ok) {
      throw new Error(json.message)
    }
    return json
  } catch (error) { throw new Error(error.message) }
}
