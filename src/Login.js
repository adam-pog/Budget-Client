import React, { useState } from 'react';
import './Login.scss';
import history from './config/history'
import { gql, useMutation } from '@apollo/client';
import { setAuthenticated } from "./actions/index";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const GET_TOKEN = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

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
  const [getToken] = useMutation(
    GET_TOKEN,
    { errorPolicy: 'all' }
  );

  const login = () => {
    getToken({
      variables: { username: username, password: password }
    }).then((response) => {
      if(response.errors) {
        console.log('Authentication Failed')
      } else {
        setAuthenticated({
          authenticated: true,
          token: response.data.tokenAuth.token
        });

        history.push('/monthly_budgets')
      }
    })
  }

  const onKeyDown = (key) => {
    if (key === 'Enter') login()
  }

  return (
    <div className={'loginInputContainer'} data-class='container'>
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

Login.propTypes = {
  setAuthenticated: PropTypes.func
}

export default connect(null, mapDispatchToProps)(Login);
