import React, { useState, useEffect } from 'react';
import './MonthlyBudgets.scss';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import history from './config/history';
import Select from 'react-select'

const getMonthlyBudgets = gql`
  query monthlyBudgets($year: String!) {
    monthlyBudgets(year: $year) {
      id,
      month,
      net
    }
  }
`;

const getAvailableYears = gql`
  query allBudgetYears {
    allBudgetYears
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

const currentYear = new Date().getFullYear();

function MonthlyBudgets({menuState, hideMenu}) {
  const [budgetYear, setBudgetYear] = useState(currentYear);

  const [getBudgets, getMonthlyBudgetsResponse] = useLazyQuery(getMonthlyBudgets)

  const getAvailableYearsResponse = useQuery(getAvailableYears, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    getBudgets({
      variables: { year: budgetYear },
      fetchPolicy: 'network-only'
    });
  }, [budgetYear]);

  const monthlyBudgetsData = () => {
    return getMonthlyBudgetsResponse.data
  }

  const monthlyBudgetsError = () => {
    return getMonthlyBudgetsResponse.error
  }

  const yearOptions = () => {
    const years = getAvailableYearsResponse.data && getAvailableYearsResponse.data.allBudgetYears;

    if(years) {
      if ((budgetYear === currentYear) && budgetYear !== years[0]) {
        setBudgetYear(years[0])
      }
      return years.map(year => ({ label: year, value: year }));
    }
  }

  const onClick = () => {
    hideMenu();
    history.push('/add_monthly_budget');
  }

  const monthlyBudgetsPresent = () => (
    monthlyBudgetsData() && monthlyBudgetsData().monthlyBudgets.length > 0
  )

  const onClickCategory = (id) => {
    // history.push(`/budget_category/${id}`);
    console.log('monthly budget id: ', id)
  }

  const amountClass = (net) => (
    net >= 0 ? 'budgetColor' : 'overBudgetColor'
  );

  return (
    <div className='monthlyBudgetsPage' data-class='container'>
      { monthlyBudgetsError() && <p>Error fetching data</p> }
      <div className={'monthlyBudgets'} data-class='container'>
        <h1>Budgets</h1>
        { yearOptions() && (
            <Select
              options={yearOptions()}
              defaultValue={{ value: budgetYear, label: budgetYear }}
              styles={selectStyles}
              className='budgetYearSelect'
              isSearchable={false}
              onChange={option => (setBudgetYear(option.value))}
            />
          )
        }
        { monthlyBudgetsPresent() && (
          monthlyBudgetsData() && monthlyBudgetsData().monthlyBudgets.map((monthlyBudget, i) => (
            <span key={i} className='monthlyBudgetContainerWrap'>
            <div className='monthlyBudgetContainer' onClick={() => onClickCategory(monthlyBudget.id)}>
            <p className='monthlyBudgetMonth'>{monthlyBudget.month}</p>
            <p className={`monthlyBudgetNet ${amountClass(monthlyBudget.net)}`}>{monthlyBudget.net}</p>
            </div>
            </span>
          ))
        )}
      </div>
      <div
        className={`addMonthlyBudget ${monthlyBudgetsPresent() ? menuState : ''}`}
        onClick={() => onClick()}
      >
        <div className='addMonthlyBudgetButton'>Add Budget</div>
      </div>
    </div>
  )
}

export default MonthlyBudgets;
