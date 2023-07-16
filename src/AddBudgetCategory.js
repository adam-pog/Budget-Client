import React, { useState } from 'react';
import './AddBudgetCategory.scss';
import history from './config/history'
import Header from './Header'
import PropTypes from 'prop-types';

function AddBudgetCategory({ match }) {
  const [label, setLabel] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState(0);

  const onKeyDown = (key) => {
    if (key === 'Enter') onSubmit()
  }

  const onSubmit = () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: label, amount: monthlyAmount})
    }
    fetch(`http://localhost:8000/budgets/${match.params.budget_id}/categories`, options).then((response) => 
      history.push(`/budgets/${match.params.budget_id}/budget_categories`)
    )
  }

  return (
    <div className={'addCategoryInputContainer'} data-class='container'>
      <Header prevRoute={`/budgets/${match.params.budget_id}/categories`} title={'Create Category'}/>
      <span className='inputWrap'>
        <input
          type='text'
          className='input'
          autoFocus
          onChange={(e) => setLabel(e.target.value)}
          placeholder='Label'
          onKeyPress={(e) => onKeyDown(e.key)}
          >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='number'
          className='input'
          onChange={(e) => setMonthlyAmount(parseInt(e.target.value))}
          placeholder='Monthly Amount'
          onKeyPress={(e) => onKeyDown(e.key)}
        >
        </input>
      </span>

      <input
        className='addBudgetCategorySubmit'
        type='button'
        value='Submit'
        onClick={() => onSubmit()}
      >
      </input>
    </div>
  )
}

AddBudgetCategory.propTypes = {
  match: PropTypes.object
}

export default AddBudgetCategory;
