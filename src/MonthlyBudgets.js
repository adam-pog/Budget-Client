import React, { useState, useEffect } from 'react';
import './MonthlyBudgets.scss';
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
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

const AUTO_ADD_MONTHLY_BUDGET = gql`
  mutation autoCreateMonthlyBudget {
    autoCreateMonthlyBudget {
      monthlyBudget {
        id
        month
        year
        income
        net
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

const currentYear = new Date().getFullYear();

function MonthlyBudgets({menuState, hideMenu}) {
  const [budgetYear, setBudgetYear] = useState(currentYear);

  const [getBudgets, getMonthlyBudgetsResponse] = useLazyQuery(getMonthlyBudgets, {
    fetchPolicy: 'network-only'
  })

  const getAvailableYearsResponse = useQuery(getAvailableYears, {
    fetchPolicy: 'network-only'
  });

  const [autoAddMonthlyBudget] = useMutation(
    AUTO_ADD_MONTHLY_BUDGET,
    { errorPolicy: 'all' }
  );

  useEffect(() => {
      getBudgets({ variables: { year: budgetYear } });
    },
    [budgetYear]
  );

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

  const manuallyAddBudget = () => {
    hideMenu();
    history.push('/add_monthly_budget');
  }

  const autoAddBudget = () => {
    hideMenu();
    autoAddMonthlyBudget().then(() => {
      getBudgets({ variables: { year: budgetYear } });
    })

  }

  const monthlyBudgetsPresent = () => (
    monthlyBudgetsData() && monthlyBudgetsData().monthlyBudgets.length > 0
  )

  const onClickCategory = (id) => {
    history.push(`/budgets/${id}/budget_categories/`);
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
      <div className='submitContainer'>
        <div
          className={`addMonthlyBudget manuallyAddBudget ${menuState}`}
          onClick={() => manuallyAddBudget()}
        >
          <div className='addMonthlyBudgetButton'>Manual Add</div>
        </div>
        <div
          className={`addMonthlyBudget autoAddBudget ${menuState}`}
          onClick={() => autoAddBudget()}
        >
          <div className='addMonthlyBudgetButton'>Auto Add Budget</div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyBudgets;
