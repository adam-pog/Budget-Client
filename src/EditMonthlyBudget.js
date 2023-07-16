import React, { useState, useEffect } from 'react';
import './EditMonthlyBudget.scss';
import history from './config/history'
import Header from './Header'
import Select from 'react-select'
import PropTypes from 'prop-types';

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

function EditMonthlyBudget({ match }) {

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [income, setIncome] = useState('');
  const [monthOption, setMonthOption] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/budgets/${match.params.budget_id}`).then((response) => 
      response.json()
    ).then((data) => {
      console.log(data)
      setYear(data.year);
      setMonth(data.month);
      setIncome(data.amount);
      setMonthOption(monthOptions.find((option) => option.value === data.month));
    });
  }, [match.params.budget_id]);

  const onKeyDown = (key) => {
    if (key === 'Enter') onSubmit()
  }

  const onSubmit = () => {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year: year, month: month, amount: income})
    }
    fetch(`http://localhost:8000/budgets/${match.params.budget_id}`, options).then((response) => 
      history.push('/budgets')
    )
  }

  const onChangeSelect = (option) => {
    setMonth(option.value)
    setMonthOption(option)
  }

  return (
    <div className={'editBudgetInputContainer'} data-class='container'>
      <Header prevRoute={'/budgets'} title={'Edit Budget'}/>
      <span className='inputWrap'>
        <input
          type='number'
          className='input'
          step=".01"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value))}
          placeholder='Income'
        >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='text'
          value={year}
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
          value={monthOption}
          className='monthSelect'
          isSearchable={false}
          placeholder={"Month"}
          onChange={option => onChangeSelect(option)}
        />
      </span>

      <input
        className='editMonthlyBudgetSubmit'
        type='button'
        value='Submit'
        onClick={() => onSubmit()}
      >
      </input>
    </div>
  )
}

EditMonthlyBudget.propTypes = {
  match: PropTypes.object
}

export default EditMonthlyBudget;
