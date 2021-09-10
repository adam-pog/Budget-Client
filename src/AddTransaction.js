import React, { useState } from 'react';
import './AddTransaction.scss';
import history from './config/history'
import { gql, useMutation } from '@apollo/client';
import Header from './Header'

const ADD_TRANSACTION = gql`
  mutation createTransaction($amount: Float!, $source: String!, $date: String!, $description: String!, $categoryId: ID!) {
    createTransaction(amount: $amount, source: $source, date: $date, description: $description, categoryId: $categoryId) {
      transaction {
        id
      }
    }
  }
`;

function AddTransaction({ match }) {
  const [amount, setAmount] = useState(0);
  const [source, setSource] = useState('');
  const [date, setDate] = useState(0);
  const [description, setDescription] = useState(0);
  const [addTransaction] = useMutation(
    ADD_TRANSACTION,
    { errorPolicy: 'all' }
  );

  const onKeyDown = (key) => {
    if (key === 'Enter') onSubmit()
  }

  const onSubmit = () => {
    addTransaction({
      variables: {
        amount: amount,
        source: source,
        date: date,
        description: description,
        categoryId: match.params.id
      }
    }).then(() => {
      history.push(`/budget_category/${match.params.id}`)
    })
  }

  return (
    <div className={'inputContainer'} data-class='container'>
      <Header prevRoute={`/budget_category/${match.params.id}`} title={'Create Transaction'} />
      <span className='inputWrap'>
        <input
          type='text'
          className='input'
          autoFocus
          onChange={(e) => setSource(e.target.value)}
          placeholder='Source'
          onKeyPress={(e) => onKeyDown(e.key)}
          >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='number'
          className='input'
          onChange={(e) => setAmount(parseInt(e.target.value))}
          placeholder='Amount'
          onKeyPress={(e) => onKeyDown(e.key)}
        >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='text'
          className='input'
          onChange={(e) => setDate(e.target.value)}
          placeholder='Date'
          onKeyPress={(e) => onKeyDown(e.key)}
          >
        </input>
      </span>

      <span className='inputWrap'>
        <input
          type='text'
          className='input'
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          onKeyPress={(e) => onKeyDown(e.key)}
          >
        </input>
      </span>

      <input
        className='addTransactionSubmit'
        type='button'
        value='Submit'
        onClick={() => onSubmit()}
      >
      </input>
    </div>
  )
}

export default AddTransaction;
