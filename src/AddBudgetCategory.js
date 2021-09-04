import React, { useState } from 'react';
import './AddBudgetCategory.scss';
import history from './config/history'
import { gql, useMutation } from '@apollo/client';

const ADD_BUDGET_CATEGORY = gql`
  mutation createBudgetCategory($label: String!, $monthlyAmount: Int!) {
    createBudgetCategory(input: { label: $label, monthlyAmount: $monthlyAmount }) {
      budgetCategory {
        id
      }
    }
  }
`;

function AddBudgetCategory() {
  const [label, setLabel] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [addBudgetCategory] = useMutation(
    ADD_BUDGET_CATEGORY,
    { errorPolicy: 'all' }
  );

  const onKeyDown = (key) => {
    if (key === 'Enter') onSubmit()
  }

  const onSubmit = () => {
    addBudgetCategory({
      variables: { label: label, monthlyAmount: monthlyAmount }
    }).then(() => {
      history.push('/budget_categories')
    })
  }

  return (
    <div className={'inputContainer'}>
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

export default AddBudgetCategory;
