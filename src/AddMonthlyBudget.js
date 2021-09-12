import React, { useState } from 'react';
import './AddMonthlyBudget.scss';
import history from './config/history'
import { gql, useMutation } from '@apollo/client';
import Header from './Header'
import Select from 'react-select'

const ADD_MONTHLY_BUDGET = gql`
  mutation createMonthlyBudget($year: String!, $month: String!, $income: Int!) {
    createMonthlyBudget(year: $year, month: $month, income: $income) {
      monthlyBudget {
        id
      }
    }
  }
`;

const selectStyles = {
  control: (base, state) => ({
     ...base,
     border: 'none',
     boxShadow: state.isFocused ? null : null
  }),
  menu: (base, state) => ({
    ...base,
    background: '#ddd',
    color: '#222'
  })
}

const monthOptions = [
  { label: 'January', value: 'January' },
  { label: 'February', value: 'February' },
  { label: 'March', value: 'March' },
  { label: 'April', value: 'April' },
  { label: 'May', value: 'May' },
  { label: 'June', value: 'June' },
  { label: 'July', value: 'July' },
  { label: 'August', value: 'August' },
  { label: 'September', value: 'September' },
  { label: 'October', value: 'October' },
  { label: 'November', value: 'November' },
  { label: 'December', value: 'December' },
]

function AddMonthlyBudget() {
  const [year, setYear] = useState(undefined);
  const [month, setMonth] = useState(undefined);
  const [income, setIncome] = useState(undefined);
  const [addMonthlyBudget] = useMutation(
    ADD_MONTHLY_BUDGET,
    { errorPolicy: 'all' }
  );

  const onKeyDown = (key) => {
    if (key === 'Enter') onSubmit()
  }

  const onSubmit = () => {
    addMonthlyBudget({
      variables: { year: year, month: month, income: income }
    }).then(() => {
      history.push('/budgets')
    })
  }

  return (
    <div className={'inputContainer'} data-class='container'>
      <Header prevRoute={'/monthly_budgets'} title={'Create Budget'}/>
      <span className='inputWrap'>
        <input
          type='number'
          className='input'
          onChange={(e) => setIncome(parseInt(e.target.value))}
          placeholder='Income'
        >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='text'
          className='input'
          onChange={(e) => setYear(e.target.value)}
          placeholder='Year'
          onKeyPress={(e) => onKeyDown(e.key)}
          >
        </input>
      </span>

      <span className='inputWrap monthSelectWrap'>
        <Select
          options={monthOptions}
          styles={selectStyles}
          className='monthSelect'
          isSearchable={false}
          placeholder={"Month"}
          onChange={option => (setMonth(option.value))}
        />
      </span>

      <input
        className='addMonthlyBudgetSubmit'
        type='button'
        value='Submit'
        onClick={() => onSubmit()}
      >
      </input>
    </div>
  )
}

export default AddMonthlyBudget;
