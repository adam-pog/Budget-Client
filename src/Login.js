import React, { useState } from 'react';
import './Login.scss';
import history from './config/history'
import { Fetch } from './FetchHelper.js'
import { setAuthenticated } from "./actions/index";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    )
  };
}

function Login({ setAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    const body = { username: username, password: password }

    Fetch('shelf_auth/api-token-auth/', 'post', JSON.stringify(body))
    .then(([status, response]) => {
      if(status === 200) {
        setAuthenticated({authenticated: true, token: response.token});
        history.push('/budget_categories')
      } else {
        console.log('Authentication Failed')
      }
    })
  }

  const onKeyDown = (key) => {
    if (key === 'Enter') login()
  }

  return (
    <div className={'inputContainer'} data-class='container'>
      <span className='inputWrap'>
        <input
          type='text'
          className='input'
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          onKeyPress={(e) => onKeyDown(e.key)}
          >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='password'
          className='input'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          onKeyPress={(e) => onKeyDown(e.key)}
        >
        </input>
      </span>

      <input
        className='loginSubmit'
        type='button'
        value='Submit'
        onClick={login}
      >
      </input>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Login);
