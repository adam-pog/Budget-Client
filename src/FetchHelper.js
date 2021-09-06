import { setAuthenticated } from './actions/index';
import Store from './config/configureStore'

export function Fetch(url, method, body = null) {
  const token = localStorage.getItem('token');

  return fetch(url, {
    method: method,
    headers: {
      'Content-Type':'application/json',
      ...(token && {"Authorization" : `Token ${token}`})
    },
    credentials: 'same-origin',
    ...(body && {body: body})
  })
  .then(response => {
    return Promise.all([response.status, response.json()])
  })
  .then(([status, response]) => {
    if(status === 401) {
      Store.dispatch(setAuthenticated({authenticated: false}))
    }

    return Promise.all([status, response])
  })
}
