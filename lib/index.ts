export const fetchData = async (path: string, body = {}, headers = { 'Content-Type': 'application/json' }) => {
  const init: RequestInit = {
    method: Object.keys(body).length ? 'POST' : 'GET',
    credentials: 'include',
    headers
  }
  if (Object.keys(body).length) init.body = JSON.stringify(body)

  const res: Response = await fetch(path, init)
  if (res.status === 204)
    return null
  else {
    const data = await res.json()
    return data
  }
}

export const dataReducer = (state: any, action: any) => {
  const mapAction = (state: any, action: any): void => Object.keys(action).forEach((key: string): void => {
    if (typeof action[key] === 'object') {
      if (!state[key]) state[key] = {}
      mapAction(state[key], action[key])
      if (!Object.keys(state[key]).length) delete state[key]

    } else if (action[key] === undefined) delete state[key]
    else state[key] = action[key]
  })

  const newState = { ...state }
  mapAction(newState, action)
  return newState
}
