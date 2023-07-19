import React, { useEffect, useState } from 'react';
import './MonthlyBudgets.scss';
import history from './config/history';
import Select from 'react-select'
import PropTypes from 'prop-types';

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
  const [availableYears, setAvailableYears] = useState(null);
  const [monthlyBudgets, setmonthlyBudgets] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [uploadData, setUploadData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/budgets/years').then((response) => 
      response.json()
    ).then((data) => {
      setAvailableYears(data.years)
    });

    fetch(`http://localhost:8000/budgets/year/${budgetYear}/`).then((response) => 
      response.json()
    ).then((data) => {
      setmonthlyBudgets(data.budgets)
    });
  }, [budgetYear])

  const yearOptions = () => {
    if(availableYears) {
      if ((budgetYear === currentYear) && budgetYear !== availableYears[0]) {
        setBudgetYear(availableYears[0])
      }
      return availableYears.map(year => ({ label: year, value: year }));
    }
  }

  const manuallyAddBudget = () => {
    hideMenu();
    history.push('/add_monthly_budget');
  }

  const autoAddBudget = () => {
    hideMenu();
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch(`http://localhost:8000/budgets/year/${budgetYear}`, options).then((response) => 
      window.location.reload()
    )
  }

  const onClickCategory = (id) => {
    history.push(`/budgets/${id}/budget_categories/`);
  }

  const amountClass = (net) => (
    net >= 0 ? 'budgetColor' : 'overBudgetColor'
  );

  const onClickDelete = (e, id) => {
    e.stopPropagation();
    hideMenu();

    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch(`http://localhost:8000/budgets/${id}`, options).then((response) => 
      window.location.reload()
    )
  }

  const onClickEdit = (e, id) => {
    e.stopPropagation();
    hideMenu();

    history.push(`/budgets/${id}/edit_budget`);
  }

  const uploadStatement = () => {
    let formData = new FormData();
    formData.append("file", fileData);

    const options = {
      method: 'POST',
      body: formData
    }
    fetch(`http://localhost:8000/budgets/${budgetYear}/upload_statement`, options).then((response) => 
      // window.location.reload()
      response.json()
    ).then((response) => {
      setUploadData(response.transactions)
      document.getElementById('scrollBox').scrollTop = 0
    })
  }

  const bulkUpload = () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({transactions: uploadData})
    }
    fetch(`http://localhost:8000/budgets/${budgetYear}/bulk_upload`, options).then((response) => 
      window.location.reload()
    )
  }

  const onFileChange = (e) => {
    setFileData(e.target.files[0])
  }

  const updateDate = (e, i) => {
    const value = e.target.value

    let temp = [...uploadData]
    temp[i].date = value
    
    setUploadData(temp)
  }  
  
  const updateSource = (e, i) => {
    const value = e.target.value

    let temp = [...uploadData]
    temp[i].source = value
    
    setUploadData(temp)
  }  
  const updateCategory = (e, i) => {
    const value = e.target.value

    let temp = [...uploadData]
    temp[i].category = value
    
    setUploadData(temp)
  }  
  const updateAmount = (e, i) => {
    const value = e.target.value

    let temp = [...uploadData]
    temp[i].amount = value
    
    setUploadData(temp)
  }

  return (
    (uploadData.length === 0 && (
      <div className='monthlyBudgetsPage' data-class='container'>
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
          { monthlyBudgets && (
            monthlyBudgets.map((monthlyBudget, i) => (
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
        <div className={`uploadStatementContainer ${menuState}`}>
              <input className={`uploadStatement`} type="file" onChange={onFileChange}/>
              <button className={`uploadStatement`} onClick={uploadStatement}>
                  Upload!
              </button>
          </div>
      </div>
    )) || (uploadData.length > 0 && (
      <div className={'monthlyBudgetsPage'}>
        <div className={'monthlyBudgets'} id='scrollBox'>
          { uploadData.map((transaction, i) => (
            <div key={i} className='bulk-input-container'>
              <input
                type='text'
                className='bulk-input'
                autoFocus
                value={uploadData[i].date}
                onChange={(e) => updateDate(e, i)}
                placeholder='Date'
              >
              </input>
              <input
                type='text'
                className='bulk-input-long'
                autoFocus
                value={uploadData[i].source}
                onChange={(e) => updateSource(e, i)}
                placeholder='Source'
              >
              </input>            
              <input
                type='text'
                className='bulk-input'
                autoFocus
                value={uploadData[i].category}
                onChange={(e) => updateCategory(e, i)}
                placeholder='Category'
              >
              </input>              
              <input
                type='text'
                className='bulk-input'
                autoFocus
                value={uploadData[i].amount}
                onChange={(e) => updateAmount(e, i)}
                placeholder='Amount'
              >
              </input>
            </div>
          ))}
        </div>
        <div
          className={`addBudgetCategory`}
          onClick={() => bulkUpload()}
        >
          <div className='addBudgetCategoryButton'>Upload Transactions</div>
        </div>
      </div>
    ))
  )
}

MonthlyBudgets.propTypes = {
  menuState: PropTypes.string,
  hideMenu: PropTypes.func,
  match: PropTypes.object,
}

export default MonthlyBudgets;
