import React from 'react';
import './App.scss';
import Login from './Login.js'
import Signup from './Signup.js'
import BudgetCategories from './BudgetCategories.js'
import AddBudgetCategory from './AddBudgetCategory.js'
import history from './config/history';
import { Route, Router, Switch, Redirect, Link } from 'react-router-dom'
import { connect } from "react-redux";
import { Fetch } from './FetchHelper.js'
import { setAuthenticated } from "./actions/index";

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
    Fetch('logout', 'post')
    .then(([status, _response]) => {
      if(status === 200) {
        this.props.setAuthenticated({authenticated: false, name: ''})
        this.setState({ menuState: 'hidden' })
      } else {
        console.log("Couldn't authenticate")
      }
    })
  }

  onDoubleClick(target) {
    if (target.dataset.class === 'container') {
      if (this.state.menuState === 'hidden' || this.state.menuState === 'closeMenu') {
        this.setState({ menuState: 'openMenu' })
      } else {
        this.setState({ menuState: 'closeMenu' })
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
            <ol className={'menu'} data-class='container' onDoubleClick={(e) => this.onDoubleClick(e.target)}>
              <li className={`listItem ${this.state.menuState}`}>
                <Link className="menuLink" to="/budget_categories" > Home </Link>
              </li>
              <li className={`listItem ${this.state.menuState}`}>
                <button className="menuLink" onClick={() => this.logout()}> Logout </button>
              </li>
            </ol>
          }
          {
            !this.props.authenticated &&
            <ol className={'menu'} data-class='container' onDoubleClick={(e) => this.onDoubleClick(e.target)}>
              <li className={`listItem ${this.state.menuState}`}>
                {
                  (history.location.pathname == '/login') &&
                  <Link className="menuLink" to="/signup" onClick={() => this.hideMenu()}> Signup </Link>
                }
                {
                  (history.location.pathname == '/signup') &&
                  <Link className="menuLink" to="/login" onClick={() => this.hideMenu()}> Login </Link>
                }
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
              { !this.props.authenticated &&
                <Route path="/signup">
                  <Signup />
                </Route>
              }

              <PrivateRoute
                path='/budget_categories'
                component={BudgetCategories}
                menuState={this.state.menuState}
                hideMenu={() => this.hideMenu()}
                authenticated={this.props.authenticated}>
              </PrivateRoute>

              <PrivateRoute
                path='/add_budget_category'
                component={AddBudgetCategory}
                menuState={this.state.menuState}
                authenticated={this.props.authenticated}>
              </PrivateRoute>

              <Route>
                { !this.props.authenticated &&
                  <Redirect to='/login' />
                }
                { this.props.authenticated &&
                  <Redirect to='/budget_categories' />
                }

              </Route>
            </Switch>
          </div>
        </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
