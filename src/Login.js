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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    const body = { email: email, password: password }

    Fetch('login', 'post', JSON.stringify(body))
    .then(([status, response]) => {
      if(status === 200) {
        setAuthenticated({authenticated: true, name: response.name});
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
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
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
