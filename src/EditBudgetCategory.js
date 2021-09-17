import React, { useState, useEffect } from 'react';
import './EditBudgetCategory.scss';
import history from './config/history'
import { gql, useMutation, useQuery } from '@apollo/client';
import Header from './Header'
import PropTypes from 'prop-types';

const EDIT_CATEGORY = gql`
  mutation editCategory($label: String!, $monthlyAmount: Int!, $id: ID!) {
    editCategory(label: $label, monthlyAmount: $monthlyAmount, id: $id) {
      category {
        id
      }
    }
  }
`;

const getBudgetCategory = gql`
  query budgetCategory($id: ID!) {
    category(id: $id) {
      id
      label
      monthlyAmount
      spent
      transactions {
        id
        amount
        source
        date
        recurring
        description
      }
    }
  }
`;

function EditBudgetCategory({ match }) {
  const { data } = useQuery(getBudgetCategory, {
    variables: { id:  match.params.category_id},
    fetchPolicy: 'network-only'
  });

  console.log(data)

  const [label, setLabel] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [editCategory] = useMutation(
    EDIT_CATEGORY,
    { errorPolicy: 'all' }
  );

  useEffect(() => {
      data && setLabel(data.category.label)
      data && setMonthlyAmount(data.category.monthlyAmount)
    },
    [data]
  );

  const onKeyDown = (key) => {
    if (key === 'Enter') onSubmit()
  }

  const onSubmit = () => {
    editCategory({
      variables: { label: label, monthlyAmount: monthlyAmount, id: match.params.category_id }
    }).then(() => {
      history.push(`/budgets/${match.params.budget_id}/budget_categories`)
    })
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
