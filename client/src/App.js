import React, { Component, Suspense } from 'react';
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
// import HomePage from "./Pages/Home";
const HomePage = React.lazy(() => import('./Pages/Home'));

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <CssBaseline />
          <NavBar />
          <div className='main'>
            <Suspense fallback={<div className='loader'> </div>}>
              <Switch>
                <Route path='/' exact render={() => <HomePage />} />
                <Route path='/Pad/:id' component={PadDetailsPage} />
                <Route path='/Booking/:id' component={BookingPage} />
              </Switch>
            </Suspense>

            <Switch>
              <Route
                path='/ManagerDashboard'
                render={() => <ManagerDashboard />}
              />
            </Switch>
          </div>
          <Route path='/Login' component={LogInPage} />
          <Route path='/Signup' component={SignUpPage} />
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
