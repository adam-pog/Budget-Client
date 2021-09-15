import React from 'react';
import './BudgetCategory.scss';
import { gql, useQuery } from '@apollo/client';
import history from './config/history';
import Header from './Header';

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

function BudgetCategory({menuState, hideMenu, match}) {
  const { error, data } = useQuery(getBudgetCategory, {
    variables: { id:  match.params.category_id},
    fetchPolicy: 'network-only'
  });

  const amountClass = (budgetCategory) => (
    budgetCategory.spent < budgetCategory.monthlyAmount ?
    'budgetColor' : 'overBudgetColor'
  )

  const onClickAdd = () => {
    hideMenu()
    history.push(`/budgets/${match.params.budget_id}/budget_categories/${match.params.category_id}/add_transaction`)
  }

  return (
    <div className='budgetCategoriesPage' data-class='container'>
      { error && <p>Error fetching data</p> }
      { data && data.category && (
        <div className={'budgetCategory'} data-class='container'>
          {
            <div className='categoryTitleContainer' data-class='container'>
              <Header prevRoute={`/budgets/${match.params.budget_id}/budget_categories`} title={data.category.label}/>
              <h3 className={`categoryAmount ${amountClass(data.category)}`}>{data.category.spent.toFixed(2)} / {data.category.monthlyAmount}</h3>
            </div>
          }
          {
            <div className='transactions' data-class='container'>
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
        className={`addTransaction`}
        onClick={() => onClickAdd()}
      >
        <div className='addTransactionButton'>Add Transaction</div>
      </div>
    </div>
  )
}

export default BudgetCategory;
