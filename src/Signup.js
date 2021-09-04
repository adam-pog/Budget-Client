import React, { useState } from 'react';
import './Signup.scss';
import history from './config/history'
import { Fetch } from './FetchHelper.js'
import { setAuthenticated } from "./actions/index";
import { connect } from "react-redux";

function Signup({ setAuthenticated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = () => {
    const body = { email: email, password: password, name: name }

    Fetch('user', 'post', JSON.stringify(body))
    .then(([status, response]) => {
      if(status === 200) {
        history.push('/login')
      } else {
        console.log(`User creation failed: ${response.errors}`)
        console.log(response.errors)
      }
    })
  }

  const onKeyDown = (key) => {
    if (key === 'Enter') signup()
  }

  return (
    <div className={'inputContainer'} data-class='container'>
      <span className='inputWrap'>
        <input
          type='text'
          className='input'
          autoFocus
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          onKeyPress={(e) => onKeyDown(e.key)}
          >
        </input>
      </span>

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
        className='signupSubmit'
        type='button'
        value='Signup'
        onClick={signup}
      >
      </input>
    </div>
  )
}

export default Signup;
