import React from 'react';
import './App.scss';
import Login from './Login.js'
import MonthlyBudgets from './MonthlyBudgets.js'
import BudgetCategories from './BudgetCategories.js'
import BudgetCategory from './BudgetCategory.js'
import AddMonthlyBudget from './AddMonthlyBudget.js'
import AddBudgetCategory from './AddBudgetCategory.js'
import EditBudgetCategory from './EditBudgetCategory.js'
import EditMonthlyBudget from './EditMonthlyBudget.js'
import EditTransaction from './EditTransaction.js'
import AddTransaction from './AddTransaction.js'
import history from './config/history';
import { Route, Router, Switch, Redirect, Link } from 'react-router-dom'
import { connect } from "react-redux";
import { setAuthenticated } from "./actions/index";
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    )
  };
}

const PrivateRoute = ({ component: Component, authenticated, menuState, hideMenu, ...rest }) => (
  <Route {...rest} render={(props) => (
    authenticated
      ? <Component {...props } menuState={menuState} hideMenu={hideMenu}/>
      : <Redirect to='/' />
  )} />
)

class App extends React.Component {
  state = {
    menuState: 'hidden'
  }

  logout() {
    this.props.setAuthenticated({authenticated: false})
    this.setState({ menuState: 'hidden' })
  }

  onDoubleClick(target) {
    if (target.dataset.class === 'container') {
      if (this.state.menuState === 'hidden' || this.state.menuState === 'closeMenu') {
        this.setState({ menuState: 'openMenu' })
      } else {
        this.setState({ menuState: 'closeMenu' }, () => {
          setTimeout(() => { this.setState({ menuState: 'hidden' }) }, 300)
        });
      }
    }
  }

  hideMenu() {
    this.setState({ menuState: 'hidden' })
  }

  render() {
    return (
        <Router history={ history }>
          {
            this.props.authenticated &&
            <ol className={`menu ${this.state.menuState}`} data-class='container' onDoubleClick={(e) => this.onDoubleClick(e.target)}>
              <li className={`listItem ${this.state.menuState}`}>
                <Link className="menuLink" to="/budgets" onClick={() => this.hideMenu()}> Home </Link>
              </li>
              <li className={`listItem ${this.state.menuState}`}>
                <button className="menuLink" onClick={() => this.logout()}> Logout </button>
              </li>
            </ol>
          }
          <div
            className='App'
            onDoubleClick={(e) => this.onDoubleClick(e.target)}
            data-class='container'
          >

            <Switch>
              <Route exact path='/login'>
                { !this.props.authenticated &&
                  <Login />
                }
              </Route>

              <PrivateRoute
                path='/budgets/:budget_id/add_budget_category'
                component={AddBudgetCategory}
                menuState={this.state.menuState}
                authenticated={this.props.authenticated}>
              </PrivateRoute>

              <PrivateRoute
                path='/budgets/:budget_id/edit_budget'
                component={EditMonthlyBudget}
                menuState={this.state.menuState}
                authenticated={this.props.authenticated}>
              </PrivateRoute>

              <PrivateRoute
                path='/budgets/:budget_id/edit_budget_category/:category_id'
                component={EditBudgetCategory}
                menuState={this.state.menuState}
                authenticated={this.props.authenticated}>
              </PrivateRoute>

              <PrivateRoute
                path='/budgets/:budget_id/budget_categories/:category_id/edit_transaction/:transaction_id'
                component={EditTransaction}
                menuState={this.state.menuState}
                authenticated={this.props.authenticated}>
              </PrivateRoute>

              <PrivateRoute
                path='/budgets/:budget_id/budget_categories/:category_id/add_transaction'
                component={AddTransaction}
                menuState={this.state.menuState}
                authenticated={this.props.authenticated}>
              </PrivateRoute>

              <PrivateRoute
                path='/budgets/:budget_id/budget_categories/:category_id'
                component={BudgetCategory}
                menuState={this.state.menuState}
                hideMenu={() => this.hideMenu()}
                authenticated={this.props.authenticated}>
              </PrivateRoute>

              <PrivateRoute
                path='/budgets/:budget_id/budget_categories'
                component={BudgetCategories}
                menuState={this.state.menuState}
                hideMenu={() => this.hideMenu()}
                authenticated={this.props.authenticated}>
              </PrivateRoute>

              <PrivateRoute
                path='/budgets'
                component={MonthlyBudgets}
                menuState={this.state.menuState}
                hideMenu={() => this.hideMenu()}
                authenticated={this.props.authenticated}>
              </PrivateRoute>

              <PrivateRoute
                path='/add_monthly_budget'
                component={AddMonthlyBudget}
                menuState={this.state.menuState}
                authenticated={this.props.authenticated}>
              </PrivateRoute>

              <Route>
                { !this.props.authenticated &&
                  <Redirect to='/login' />
                }
                { this.props.authenticated &&
                  <Redirect to='/budgets' />
                }

              </Route>
            </Switch>
          </div>
        </Router>
    )
  }
}

App.propTypes = {
  authenticated: PropTypes.bool,
  setAuthenticated: PropTypes.func
}

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool,
  setAuthenticated: PropTypes.func,
  menuState: PropTypes.string,
  hideMenu: PropTypes.func,
  component: PropTypes.elementType
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
