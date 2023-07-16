import React, { useState, useEffect } from 'react';
import './EditBudgetCategory.scss';
import history from './config/history'
import Header from './Header'
import PropTypes from 'prop-types';

function EditBudgetCategory({ match }) {
  const [label, setLabel] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8000/budgets/${match.params.budget_id}/categories/${match.params.category_id}`).then((response) => 
      response.json()
    ).then((data) => {
      console.log(data)
      setLabel(data.category.name)
      setMonthlyAmount(data.category.amount)
    });
  }, [match.params.budget_id, match.params.category_id]);

  const onKeyDown = (key) => {
    if (key === 'Enter') onSubmit()
  }

  const onSubmit = () => {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: label, amount: monthlyAmount })
    }
    fetch(`http://localhost:8000/budgets/${match.params.budget_id}/categories/${match.params.category_id}`, options).then((response) => 
      history.push(`/budgets/${match.params.budget_id}/budget_categories`)
    )
  }

  return (
    <div className={'inputContainer'} data-class='container'>
      <Header prevRoute={`/budgets/${match.params.budget_id}/budget_categories`} title={'Edit Category'}/>
      <span className='inputWrap'>
        <input
          type='text'
          className='input'
          autoFocus
          value={label}
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
          value={monthlyAmount}
          onChange={(e) => setMonthlyAmount(parseInt(e.target.value))}
          placeholder='Monthly Amount'
          onKeyPress={(e) => onKeyDown(e.key)}
        >
        </input>
      </span>

      <input
        className='editBudgetCategorySubmit'
        type='button'
        value='Submit'
        onClick={() => onSubmit()}
      >
      </input>
    </div>
  )
}

EditBudgetCategory.propTypes = {
  match: PropTypes.object
}

export default EditBudgetCategory;
