import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'

import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import SignInWithGoogle from '../SignInWithGoogle'
import Weather from '../WeatherCard';
import { Provider } from 'react-redux';
import store from '../../Store/Store'

import * as ROUTES from '../../constants/routes';
import Search from '../Search';
import WeatherPage from '../WeatherPage';

const App = () => (
    <Router>
        <Provider store={store}>
        <div>
        {/* <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </li> */}
            {/* <hr /> */}
            {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
            <Switch>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.WEATHER} component={WeatherPage} />
            <Route path={ROUTES.SEARCH}component={Search} />
           {/* <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
            </Switch>
        </div>
        </Provider>
    </Router>
);

export default App;