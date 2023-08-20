const baseUrl = 'http://localhost:3001/api'

export function debounce (func, timeout = 600) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}

export const request = async ({ endpoint, data, params, method = 'GET' }) => {
  let url = `${baseUrl}${endpoint}`
  const headers = {
    'Content-type': 'application/json'
  }
  // If params exist, add them to the url
  if (params) {
    const urlParams = new URLSearchParams()

    for (const key in params) {
      if (params[key]) {
        urlParams.append(key, params[key])
      }
    }
    url += `?${urlParams.toString()}`
    console.log(url)
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
    Authorization: `Bearer ${user?.state?.user?.data?.token}`
  }

  let url = `${baseUrl}${endpoint}`
  // If params exist, add them to the url
  if (params) {
    const urlParams = new URLSearchParams()

    for (const key in params) {
      if (params[key]) {
        urlParams.append(key, params[key])
      }
    }
    url += `?${urlParams.toString()}`
    console.log(url)
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
