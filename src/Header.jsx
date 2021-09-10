import React from 'react';
import './Header.scss';
import history from './config/history'

function Header({ prevRoute, title }) {
  const onBack = () => {
    history.push(prevRoute)
  }

  return (
    <div className='headerContainer' data-class='container'>
      <div className='header backHeader'>
        <button className='headerBackButton' onClick={() => onBack()}><h1 className='headerBackArrow'>{'<'}</h1></button>
      </div>
      <div className='header'>
        <h1 className='headerLabel'>{title}</h1>
      </div>
      <div className='header padding'>
      </div>
    </div>
  )
}

export default Header;
