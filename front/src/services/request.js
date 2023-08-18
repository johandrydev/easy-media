const baseUrl = 'http://localhost:3001/api'

export const request = async ({ endpoint, data, params, method = 'GET' }) => {
  const url = `${baseUrl}${endpoint}`
  const request = { url }
  const headers = {
    'Content-type': 'application/json'
  }
  // If params exist, add them to the url
  if (params) {
    request.url = `${url}?${new URLSearchParams(params)}`
  }
  if (method === 'GET') {
    return fetch(url, { headers })
  }
  return fetch(url, {
    method,
    headers,
    body: JSON.stringify(data)
  })
}

export const requestToken = async ({ endpoint, data, params, method = 'GET' }) => {
  const userStorage = localStorage.getItem('user')
  const user = userStorage ? JSON.parse(userStorage) : null

  if (!user) {
    throw new Error('User not logged in')
  }

  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${user.token}`
  }

  const url = `${baseUrl}${endpoint}`
  const request = { url }
  // If params exist, add them to the url
  if (params) {
    request.url = `${url}?${new URLSearchParams(params)}`
  }
  if (method === 'GET') {
    return fetch(url, { headers })
  }
  return fetch(url, {
    method,
    headers,
    body: JSON.stringify(data)
  })
}
