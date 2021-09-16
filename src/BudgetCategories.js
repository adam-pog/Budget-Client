import React from 'react';
import './BudgetCategories.scss';
import { gql, useQuery, useMutation } from '@apollo/client';
import history from './config/history';
import Header from './Header'

const getBudgetCategories = gql`
  query allCategories($budgetId: ID!) {
    allCategories(budgetId: $budgetId) {
      id
      label
      monthlyAmount
      spent
    }
  }
`;

const DELETE_BUDGET_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      category {
        id
      }
    }
  }
`;


function BudgetCategories({menuState, hideMenu, match}) {
  const { error, data } = useQuery(getBudgetCategories, {
    variables: { budgetId:  match.params.budget_id},
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
    history.push(`/budgets/${match.params.budget_id}/add_budget_category`);
  }

  const onClickDelete = (e, id) => {
    e.stopPropagation();
    hideMenu();
    deleteBudgetCategory({
      variables: { id: id },
      update(cache) {
        cache.evict({ id: `CategoryType:${id}` });
        cache.gc();
      }
    })
  }

  const onClickEdit = (e, id) => {
    e.stopPropagation();
    hideMenu();

    history.push(`/budgets/${match.params.budget_id}/edit_budget_category/${id}`);
  }

  const budgetCategoriesPresent = () => (
    data && data.allCategories.length > 0
  )

  const onClickCategory = (id) => {
    history.push(`/budgets/${match.params.budget_id}/budget_categories/${id}`);
  }

  return (
    <div className='budgetCategoriesPage' data-class='container'>
      { error && <p>Error fetching data</p> }
      <div className={'budgetCategories'} data-class='container'>
        <Header prevRoute={`/budgets`} title={'Categories'}/>

        { budgetCategoriesPresent() && data.allCategories.map((category, i) => (
            <span key={i} className='budgetCategoryContainerWrap'>
              <div className='budgetCategoryContainer' onClick={() => onClickCategory(category.id)}>
                <p className='categoryLabel'>{category.label}</p>
                <p className={`categoryAmount ${amountClass(category)}`}>{Math.floor(category.spent)} / {category.monthlyAmount}</p>
                <div className='pencilContainer'>
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => onClickEdit(e, category.id)} className={`pencil ${menuState}`} width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                </div>
                <p className={`iconSeparator ${menuState}`}>/</p>
                <div className='trashContainer'>
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => onClickDelete(e, category.id)} fill="currentColor" className={`trash ${menuState}`} viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </div>
              </div>
            </span>
          ))
        }
      </div>
      <div
        className={`addBudgetCategory ${menuState}`}
        onClick={() => onClick()}
      >
        <div className='addBudgetCategoryButton'>Add Category</div>
      </div>
    </div>
  )
}

export default BudgetCategories;
