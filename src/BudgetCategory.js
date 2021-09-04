import React from 'react';
import './BudgetCategory.scss';
import { gql, useQuery } from '@apollo/client';
import history from './config/history';

const getBudgetCategory = gql`
  query budgetCategories {
    currentUser {
      income
      budgetCategories {
        id
        label
        monthlyAmount
        spent
        progress
      }
    }
  }
`;

function BudgetCategory({menuState, hideMenu}) {
  const { error, data } = useQuery(getBudgetCategory, {
    fetchPolicy: 'network-only'
  });

  const amountClass = (budgetCategory) => (
    budgetCategory.spent < budgetCategory.monthlyAmount ?
    'budgetColor' : 'overBudgetColor'
  )

  const onClickAdd = () => {
    hideMenu()
    history.push('/add_budget_category')
  }

  const onClickDelete = (id) => {
    console.log('deleting: ', id)
    hideMenu()
    deleteBudgetCategory({ variables: { id: id } })
  }

  const budgetCategoriesPresent = () => (
    data && data.currentUser.budgetCategories.length > 0
  )

  return (
    <div className='budgetCategoriesPage' data-class='container'>
      { error && <p>Error fetching data</p> }
      { budgetCategoriesPresent() &&
        <div className={'budgetCategories'} data-class='container'>
          {
            data && data.currentUser.budgetCategories.map((category, i) => (
              <span key={i} className='budgetCategoryContainerWrap'>
                <div className='budgetCategoryContainer'>
                  <p className='categoryLabel'>{category.label}</p>
                  <p className={`categoryAmount ${amountClass(category)}`}>{category.spent} / {category.monthlyAmount}</p>
                  <div className='trashContainer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`trash ${menuState}`} viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </div>
                </div>
              </span>
            ))
          }
        </div>
      }
      <div
        className={`addBudgetCategory ${budgetCategoriesPresent() ? menuState : ''}`}
        onClick={() => onClickAdd()}
      >
        <div className='addBudgetCategoryButton'>Add Category</div>
      </div>
    </div>
  )
}

export default BudgetCategory;
