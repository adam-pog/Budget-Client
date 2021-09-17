import React, { useState, useEffect } from 'react';
import history from './config/history'
import { gql, useMutation, useQuery } from '@apollo/client';
import Header from './Header'
import ToggleButton from 'react-toggle-button'
import './EditTransaction.scss';
import PropTypes from 'prop-types';

const EDIT_TRANSACTION = gql`
  mutation editTransaction($amount: Float!, $source: String!, $day: Int!, $description: String!, $id: ID!, $recurring: Boolean!) {
    editTransaction(amount: $amount, source: $source, day: $day, description: $description, id: $id, recurring: $recurring) {
      transaction {
        id
      }
    }
  }
`;

const getTransaction = gql`
  query transaction($id: ID!) {
    transaction(id: $id) {
      id
      amount
      source
      date
      recurring
      description
    }
  }
`;

function EditTransaction({ match }) {
  const { data } = useQuery(getTransaction, {
    variables: { id:  match.params.transaction_id},
    fetchPolicy: 'network-only'
  });

  const [amount, setAmount] = useState(0);
  const [source, setSource] = useState('');
  const [day, setDay] = useState(new Date().getDate());
  const [description, setDescription] = useState(0);
  const [recurring, setRecurring] = useState(false);
  const [editTransaction] = useMutation(
    EDIT_TRANSACTION,
    { errorPolicy: 'all' }
  );

  useEffect(() => {
      data && setAmount(data.transaction.amount)
      data && setSource(data.transaction.source)
      data && setDay(new Date(`${data.transaction.date}T00:00:00`).getDate())
      data && setDescription(data.transaction.description)
      data && setRecurring(data.transaction.recurring)
    },
    [data]
  );

  const onKeyDown = (key) => {
    if (key === 'Enter') onSubmit()
  }

  const onSubmit = () => {
    editTransaction({
      variables: {
        id: match.params.transaction_id,
        amount: amount,
        source: source,
        day: day,
        description: description,
        recurring: recurring
      }
    }).then(() => {
      history.push(`/budgets/${match.params.budget_id}/budget_categories/${match.params.category_id}`)
    })
  }

  return (
    <div className={'inputContainer'} data-class='container'>
      <Header prevRoute={`/budgets/${match.params.budget_id}/budget_categories/${match.params.category_id}`} title={'Edit Transaction'} />

      <span className='inputWrap recurringToggle'>
        <p className={'recurringToggleLabel'}>Recurring: </p>
        <ToggleButton
          value={ recurring }
          onToggle={(value) => setRecurring(!value)}
          trackStyle={{opacity: '70%'}}
          colors={{
            activeThumb: {
              base: '#bec8cc',
            },
            inactiveThumb: {
              base: '#666f80',
            },
            active: {
              base: '#2a614d99',
              hover: '#2a614d99',
            }
          }}
          active
        />
      </span>

      <span className='inputWrap'>
        <input
          type='text'
          className='input'
          autoFocus
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder='Source'
        >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='number'
          className='input'
          step='.01'
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder='Amount'
        >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='text'
          className='input'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          onKeyPress={(e) => onKeyDown(e.key)}
        >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='number'
          className='input'
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder='Day'
          onKeyPress={(e) => onKeyDown(e.key)}
        >
        </input>
      </span>

      <input
        className='editTransactionSubmit'
        type='button'
        value='Submit'
        onClick={() => onSubmit()}
      >
      </input>
    </div>
  )
}

EditTransaction.propTypes = {
  match: PropTypes.object
}

export default EditTransaction;
