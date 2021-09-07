import React from 'react';
import './BudgetCategory.scss';
import { gql, useQuery } from '@apollo/client';
import history from './config/history';

const getBudgetCategory = gql`
  query budgetCategories($id: ID!) {
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

function BudgetCategory({menuState, hideMenu, match}) {
  const { error, data } = useQuery(getBudgetCategory, {
    variables: { id:  match.params.id},
    fetchPolicy: 'network-only'
  });

  console.log('data: ', data)

  const amountClass = (budgetCategory) => (
    budgetCategory.spent < budgetCategory.monthlyAmount ?
    'budgetColor' : 'overBudgetColor'
  )

  const onClickAdd = () => {
    hideMenu()
    history.push('/add_budget_category')
  }

  return (
    <div className='budgetCategoriesPage' data-class='container'>
      { error && <p>Error fetching data</p> }
      { data && data.category && (
        <div className={'budgetCategory'} data-class='container'>
          {
            <div className='categoryHeader'>
              <h1 className='categoryLabel'>{data.category.label}</h1>
              <h3 className={`categoryAmount ${amountClass(data.category)}`}>{data.category.spent} / {data.category.monthlyAmount}</h3>
            </div>
          }
          {
            <div className='transactions'>
              {
                data.category.transactions.map((transaction, i) => (
                  <span key={i} className='transactionsContainerWrap'>
                    <div className='transactionsContainer'>
                      <p className='transactionDetail'>{transaction.source}</p>
                      <p className='transactionDetail'>{transaction.amount}</p>
                    </div>
                  </span>
                ))
              }
            </div>
          }
        </div>
      )}
      <div
        className={`addTransaction ${(data && data.category.transactions.length > 0) ? menuState : ''}`}
        onClick={() => onClickAdd()}
      >
        <div className='addTransactionButton'>Add Transaction</div>
      </div>
    </div>
  )
}

export default BudgetCategory;
