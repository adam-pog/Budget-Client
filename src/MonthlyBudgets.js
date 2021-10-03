import React, { useState } from 'react';
import './MonthlyBudgets.scss';
import { gql, useQuery, useMutation } from '@apollo/client';
import history from './config/history';
import Select from 'react-select'
import PropTypes from 'prop-types';

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

const DELETE_MONTHLY_BUDGET = gql`
  mutation deleteMonthlyBudget($id: ID!) {
    deleteMonthlyBudget(id: $id) {
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

const currentYear = new Date().getFullYear();

function MonthlyBudgets({menuState, hideMenu, match}) {
  const [budgetYear, setBudgetYear] = useState(currentYear);

  const getMonthlyBudgetsResponse = useQuery(getMonthlyBudgets, {
    skip: !budgetYear,
    variables: { year: budgetYear },
    fetchPolicy: 'network-only'
  })

  const [deleteMonthlyBudget] = useMutation(
    DELETE_MONTHLY_BUDGET,
    { errorPolicy: 'all' }
  );

  const getAvailableYearsResponse = useQuery(getAvailableYears, {
    fetchPolicy: 'network-only'
  });

  const [autoAddMonthlyBudget] = useMutation(
    AUTO_ADD_MONTHLY_BUDGET,
    { errorPolicy: 'all' }
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
      window.location.reload()
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

  const onClickDelete = (e, id) => {
    e.stopPropagation();
    hideMenu();

    deleteMonthlyBudget({
      variables: { id: id },
      update(cache) {
        cache.evict({ id: `MonthlyBudgetType:${id}` });
        cache.gc();
      }
    })
  }

  const onClickEdit = (e, id) => {
    e.stopPropagation();
    hideMenu();

    history.push(`/budgets/${id}/edit_budget`);
  }

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
              <p className={`monthlyBudgetNet ${amountClass(monthlyBudget.net)}`}>{monthlyBudget.net.toFixed(2)}</p>
              <div className='iconContainer'>
                <div className='pencilContainer'>
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => onClickEdit(e, monthlyBudget.id)} className={`pencil ${menuState}`} width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                </div>
                <p className={`iconSeparator ${menuState}`}>/</p>
                <div className='budgetTrashContainer'>
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => onClickDelete(e, monthlyBudget.id)} fill="currentColor" className={`trash ${menuState}`} viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </div>
              </div>
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

MonthlyBudgets.propTypes = {
  menuState: PropTypes.string,
  hideMenu: PropTypes.func,
  match: PropTypes.object,
}

export default MonthlyBudgets;
