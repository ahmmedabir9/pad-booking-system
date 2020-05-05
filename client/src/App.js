import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/Navbar';
import NavBar from './Components/Navbar';
import Footer from './Components/Footer';
import axios from 'axios';
import './index.css';

import PadDetailsPage from './Pages/PadDetails';
import SignUpPage from './Pages/SignUp';
import LogInPage from './Pages/Login';

import BookingPage from './Pages/Booking';
import ManagerDashboard from './Pages/ManagerDashboard/ManagerDashboard';
import HomePage from './Pages/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <CssBaseline />
          <NavBar />
          <div className='main'>
            <Switch>
              <Route path='/go-jam' exact render={() => <HomePage />} />
              <Route path='/go-jam/pad/:id' component={PadDetailsPage} />
              <Route path='/go-jam/Booking/:id' component={BookingPage} />
            </Switch>

            <Switch>
              <Route
                path='/go-jam/ManagerDashboard'
                render={() => <ManagerDashboard />}
              />
            </Switch>
          </div>
          <Route path='/go-jam/Login' component={LogInPage} />
          <Route path='/go-jam/Signup' component={SignUpPage} />
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, null)(App);
