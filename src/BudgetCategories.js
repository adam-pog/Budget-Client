import React, { useEffect, useState } from 'react';
import './BudgetCategories.scss';
import history from './config/history';
import Header from './Header'
import PropTypes from 'prop-types';


function BudgetCategories({menuState, hideMenu, match}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/budgets/${match.params.budget_id}/categories`).then((response) => 
      response.json()
    ).then((data) => {
      setCategories(data.categories)
    });
  }, [match.params.budget_id])

  const amountClass = (budgetCategory) => (
    budgetCategory.spent <= budgetCategory.amount ?
    'budgetColor' : 'overBudgetColor'
  );

  const onClick = () => {
    hideMenu();
    history.push(`/budgets/${match.params.budget_id}/add_budget_category`);
  }

  const onClickDelete = (e, id) => {
    e.stopPropagation();
    hideMenu();

    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch(`http://localhost:8000/budgets/${match.params.budget_id}/categories/${id}`, options).then((response) => 
      window.location.reload()
    )
  }

  const onClickEdit = (e, id) => {
    e.stopPropagation();
    hideMenu();

    history.push(`/budgets/${match.params.budget_id}/edit_budget_category/${id}`);
  }

  const onClickCategory = (id) => {
    history.push(`/budgets/${match.params.budget_id}/budget_categories/${id}`);
  }

  const headerLabel = () => {
    return categories.length > 0 ? `${categories[0].month} ${categories[0].year}` : 'Categories'
  }

  return (
    <div className='budgetCategoriesPage' data-class='container'>
      <div className={'budgetCategories'} data-class='container'>
        <Header prevRoute={`/budgets`} title={headerLabel()}/>

        { categories.length > 0 && categories.map((category, i) => (
            <span key={i} className='budgetCategoryContainerWrap'>
              <div className='budgetCategoryContainer' onClick={() => onClickCategory(category.id)}>
                <p className='categoryLabel'>{category.name}</p>
                <p className={`categoryAmount ${amountClass(category)}`}>{Math.floor(category.spent)} / {category.amount}</p>
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


BudgetCategories.propTypes = {
  match: PropTypes.object,
  hideMenu: PropTypes.func,
  menuState: PropTypes.string
}


export default BudgetCategories;
