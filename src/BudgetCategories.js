import React from 'react';
import './BudgetCategories.scss';
import { gql, useQuery, useMutation } from '@apollo/client';
import history from './config/history';

const getBudgetCategories = gql`
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

const DELETE_BUDGET_CATEGORY = gql`
  mutation deleteBudgetCategory($id: ID!) {
    deleteBudgetCategory(input: { id: $id }) {
      budgetCategory {
        id
      }
    }
  }
`;


function BudgetCategories({menuState, hideMenu}) {
  const { error, data } = useQuery(getBudgetCategories, {
    fetchPolicy: 'network-only'
  });

  const [deleteBudgetCategory] = useMutation(
    DELETE_BUDGET_CATEGORY,
    { errorPolicy: 'all' }
  );

  const amountClass = (budgetCategory) => (
    budgetCategory.spent < budgetCategory.monthlyAmount ?
    'budgetColor' : 'overBudgetColor'
  );

  const onClick = () => {
    hideMenu();
    history.push('/add_budget_category');
  }

  const onClickDelete = (id) => {
    hideMenu();
    deleteBudgetCategory({
      variables: { id: id },
      update(cache) {
        cache.evict({ id: `BudgetCategory:${id}` });
        cache.gc();
      }
    })
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
                  <div className='trashContainer' onClick={() => onClickDelete(category.id)}>
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
        onClick={() => onClick()}
      >
        <div className='addBudgetCategoryButton'>Add Category</div>
      </div>
    </div>
  )
}

export default BudgetCategories;
