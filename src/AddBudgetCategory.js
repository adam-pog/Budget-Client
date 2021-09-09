import React, { useState } from 'react';
import './AddBudgetCategory.scss';
import history from './config/history'
import { gql, useMutation } from '@apollo/client';

const ADD_CATEGORY = gql`
  mutation createCategory($label: String!, $monthlyAmount: Int!) {
    createCategory(label: $label, monthlyAmount: $monthlyAmount) {
      category {
        id
      }
    }
  }
`;

function AddBudgetCategory() {
  const [label, setLabel] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [addCategory] = useMutation(
    ADD_CATEGORY,
    { errorPolicy: 'all' }
  );

  const onKeyDown = (key) => {
    if (key === 'Enter') onSubmit()
  }

  const onSubmit = () => {
    addCategory({
      variables: { label: label, monthlyAmount: monthlyAmount }
    }).then(() => {
      history.push('/budget_categories')
    })
  }

  return (
    <div className={'inputContainer'} data-class='container'>
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
