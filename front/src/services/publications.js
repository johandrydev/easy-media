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

export const getOwnPosts = async (params) => {
  try {
    const response = await requestToken({
      endpoint: '/post/own',
      params
    })
    const json = await response.json()
    if (!response.ok) {
      throw new Error(json.message)
    }
    return json
  } catch (error) { throw new Error(error.message) }
}

export const createPost = async (data) => {
  try {
    const response = await requestToken({
      endpoint: '/post',
      method: 'POST',
      data
    })
    const json = await response.json()
    if (!response.ok) {
      throw new Error(json.message)
    }
    return json
  } catch (error) { throw new Error(error.message) }
}
