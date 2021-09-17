import React from 'react';
import './BudgetCategory.scss';
import { gql, useQuery, useMutation } from '@apollo/client';
import history from './config/history';
import Header from './Header';
import PropTypes from 'prop-types';

const getBudgetCategory = gql`
  query budgetCategory($id: ID!) {
    category(id: $id) {
      id
      label
      monthlyAmount
      spent
      month
      year
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


const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      transaction {
        id
      }
    }
  }
`;

function BudgetCategory({menuState, hideMenu, match}) {
  const { error, data } = useQuery(getBudgetCategory, {
    variables: { id:  match.params.category_id},
    fetchPolicy: 'network-only'
  });

  const [deleteTransaction] = useMutation(
    DELETE_TRANSACTION,
    { errorPolicy: 'all' }
  );

  const amountClass = (budgetCategory) => (
    budgetCategory.spent <= budgetCategory.monthlyAmount ?
    'budgetColor' : 'overBudgetColor'
  )

  const onClickAdd = () => {
    hideMenu()
    history.push(`/budgets/${match.params.budget_id}/budget_categories/${match.params.category_id}/add_transaction`)
  }

  const onClickDelete = (e, id) => {
    e.stopPropagation();
    hideMenu();

    deleteTransaction({
      variables: { id: id },
      update(cache) {
        cache.evict({ id: `TransactionType:${id}` });
        cache.gc();
      }
    })
  }

  const onClickEdit = (e, id) => {
    e.stopPropagation();
    hideMenu();

    history.push(`/budgets/${match.params.budget_id}/budget_categories/${match.params.category_id}/edit_transaction/${id}`);
  }

  const getOrdinal = function(n) {
     const suffix=["th","st","nd","rd"];
     const v=n%100;
     return n+(suffix[(v-20)%10]||suffix[v]||suffix[0]);
  }

  return (
    <div className='budgetCategoriesPage' data-class='container'>
      { error && <p>Error fetching data</p> }
      { data && data.category && (
        <div className={'budgetCategory'} data-class='container'>
          {
            <div className='categoryTitleContainer' data-class='container'>
              <Header prevRoute={`/budgets/${match.params.budget_id}/budget_categories`} title={data.category.label}/>
              <h2 className='categorySubheader'>{`${data.category.month} ${data.category.year}`}</h2>
              <h3 className={`categoryAmount ${amountClass(data.category)}`}>{data.category.spent.toFixed(2)} / {data.category.monthlyAmount}</h3>
            </div>
          }
          {
            <div className='transactions' data-class='container'>
              {
                data.category.transactions.map((transaction, i) => (
                  <span key={i} className='transactionsContainerWrap'>
                    <div className='transactionsContainer'>
                      <p className='transactionDetail transactionSource'>{transaction.source}</p>
                      <p className='transactionDetail transactionDate'>{getOrdinal(new Date(`${transaction.date}T00:00:00`).getDate())}</p>
                      <p className='transactionDetail transactionAmount'>{transaction.amount}</p>
                      <div className='pencilContainer'>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => onClickEdit(e, transaction.id)} className={`pencil ${menuState}`} width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                      </div>
                      <p className={`iconSeparator ${menuState}`}>/</p>
                      <div className='transactionTrashContainer'>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => onClickDelete(e, transaction.id)} fill="currentColor" className={`trash ${menuState}`} viewBox="0 0 16 16">
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

BudgetCategory.propTypes = {
  match: PropTypes.object,
  menuState: PropTypes.string,
  hideMenu: PropTypes.func
}

export default BudgetCategory;
