import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';

import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <MainNavigation/>
                    <main className="main-content">
                        <Switch>
                            <Redirect from="/" to='/auth' exact="exact"/>
                            <Route path="/auth" component={AuthPage}/>
                            <Route path="/events" component={EventsPage}/>
                            <Route path="/bookings" component={BookingsPage}/>
                        </Switch>
                    </main>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
