import Cookies from 'js-cookie';
import { setAuthenticated } from './actions/index';
import Store from './config/configureStore'

export function Fetch(url, method, body = null) {
  const csrf_token = Cookies.get('CSRF-Token');

  return fetch(url, {
    method: method,
    headers: {
      'Content-Type':'application/json',
      ...(csrf_token && {"X-CSRF-Token" : `${csrf_token}`})
    },
    credentials: 'same-origin',
    ...(body && {body: body})
  })
  .then(response => {
    return Promise.all([response.status, response.json()])
  })
  .then(([status, response]) => {
    if(status === 401) {
      Store.dispatch(setAuthenticated({authenticated: false, name: ''}))
    }

    return Promise.all([status, response])
  })
}
