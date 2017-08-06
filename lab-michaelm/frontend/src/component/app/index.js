import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import * as util from '../../lib/util.js';
import LandingContainer from '../landing-container';
import SettingsContainer from '../settings-container';
import DashboardContainer from '../dashboard-container';
import appStoreCreate from '../../lib/app-store-create.js';
import {tokenSet,tokenDelete} from '../../action/auth-actions.js';

let store =  appStoreCreate();

class App extends React.Component {
  componentDidMount() {
    let token = util.readCookie('X-Sluggram-Token');
    if(token) {
      this.props.tokenSet(token);
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    util.deleteCookie('X-Sluggram-Token');
    localStorage.removeItem('token');
    localStorage.removeItem('loglevel');
  }

  render(){
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <header>
              <h1> Got Dat Signup and Login Going Bruh </h1>
              <nav>
                <ul>
                  <li><Link to='/welcome/signup'> Signup </Link> </li>
                  <li><Link to='/welcome/login'> Login </Link> </li>
                  <li><a href='/welcome/login' onClick={this.handleLogout}> Logout </a></li>
                  <li><Link to='/settings'> Settings </Link> </li>
                </ul>
              </nav>
            </header>
            <Route exact path='/welcome/:auth' component={LandingContainer} />
            <Route exact path='/settings' component={SettingsContainer} />
            <Route exact path='/dashboard' component={DashboardContainer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
});

let mapDispatchToProps = dispatch => ({
  tokenSet: token => dispatch(tokenSet(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
