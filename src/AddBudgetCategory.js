import React, { useState } from 'react';
import './AddBudgetCategory.scss';
import history from './config/history'
import { gql, useMutation } from '@apollo/client';
import Header from './Header'
import PropTypes from 'prop-types';

const ADD_CATEGORY = gql`
  mutation createCategory($label: String!, $monthlyAmount: Int!, $budgetId: ID!) {
    createCategory(label: $label, monthlyAmount: $monthlyAmount, budgetId: $budgetId) {
      category {
        id
      }
    }
  }
`;

function AddBudgetCategory({ match }) {
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
      variables: { label: label, monthlyAmount: monthlyAmount, budgetId: match.params.budget_id }
    }).then(() => {
      history.push(`/budgets/${match.params.budget_id}/budget_categories`)
    })
  }

  return (
    <div className={'addCategoryInputContainer'} data-class='container'>
      <Header prevRoute={`/budgets/${match.params.budget_id}/budget_categories`} title={'Create Category'}/>
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
