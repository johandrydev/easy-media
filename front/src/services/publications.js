import { requestToken } from './request'

export const getPosts = async (params) => {
  try {
    const response = await requestToken({
      endpoint: '/post',
      params
    })
    const json = await response.json()
    if (!response.ok) {
      throw new Error(json.message)
    }
    return json
  } catch (error) { throw new Error(error.message) }
}
