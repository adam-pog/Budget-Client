import React, { useState, useEffect } from 'react';
import history from './config/history'
import Header from './Header'
import ToggleButton from 'react-toggle-button'
import './EditTransaction.scss';
import PropTypes from 'prop-types';

function EditTransaction({ match }) {
  const [amount, setAmount] = useState(0);
  const [source, setSource] = useState('');
  const [day, setDay] = useState(0);
  const [description, setDescription] = useState('');
  const [recurring, setRecurring] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/budgets/${match.params.budget_id}/categories/${match.params.category_id}/transactions/${match.params.transaction_id}`).then((response) => 
      response.json()
    ).then((data) => {
      setAmount(data.transaction.amount)
      setSource(data.transaction.source)
      setDay(data.transaction.date)
      setDescription(data.transaction.description)
      setRecurring(data.transaction.recurring)
    });
  }, [match.params.budget_id, match.params.category_id, match.params.transaction_id]);


  const onKeyDown = (key) => {
    if (key === 'Enter') onSubmit()
  }

  const onSubmit = () => {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          amount: amount,
          source: source,
          day: day,
          description: description,
          recurring: recurring
      })
    }
    fetch(`http://localhost:8000/budgets/${match.params.budget_id}/categories/${match.params.category_id}/transactions/${match.params.transaction_id}`, options).then((response) => 
      history.push(`/budgets/${match.params.budget_id}/budget_categories/${match.params.category_id}`)
    )
  }

  return (
    <div className={'inputContainer'} data-class='container'>
      <Header prevRoute={`/budgets/${match.params.budget_id}/budget_categories/${match.params.category_id}`} title={'Edit Transaction'} />

      <span className='inputWrap recurringToggle'>
        <p className={'recurringToggleLabel'}>Recurring: </p>
        <ToggleButton
          value={ recurring }
          onToggle={(value) => setRecurring(!value)}
          trackStyle={{opacity: '70%'}}
          colors={{
            activeThumb: {
              base: '#bec8cc',
            },
            inactiveThumb: {
              base: '#666f80',
            },
            active: {
              base: '#2a614d99',
              hover: '#2a614d99',
            }
          }}
          active
        />
      </span>

      <span className='inputWrap'>
        <input
          type='text'
          className='input'
          autoFocus
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder='Source'
        >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='number'
          className='input'
          step='.01'
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder='Amount'
        >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='text'
          className='input'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          onKeyPress={(e) => onKeyDown(e.key)}
        >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='number'
          className='input'
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder='Day'
          onKeyPress={(e) => onKeyDown(e.key)}
        >
        </input>
      </span>

      <input
        className='editTransactionSubmit'
        type='button'
        value='Submit'
        onClick={() => onSubmit()}
      >
      </input>
    </div>
  )
}

EditTransaction.propTypes = {
  match: PropTypes.object
}

export default EditTransaction;
