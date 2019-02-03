import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';

import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

class App extends Component {
    state = {
        token: null,
        userId: null
    };

    login = (token, userId, toeknExpiration) => {
        this.setState({token: token, userId: userId});
    };

    logout = () => {
        this.setState({token: null, userId: null});
    };

    render() {
        return (
            <BrowserRouter>
                <AuthContext.Provider
                    value={{
                        token: this.state.token,
                        userId: this.state.userId,
                        login: this.login,
                        logout: this.logout
                    }}>
                    <MainNavigation/>
                    <main className="main-content">
                        <Switch>
                            {
                                !this.state.token && (
                                    <React.Fragment>
                                        <Redirect from="/" to='/auth' exact="exact"/>
                                        <Route path="/auth" component={AuthPage}/>
                                        <Route path="/events" component={EventsPage}/>
                                    </React.Fragment>
                                )
                            }
                            {
                                this.state.token && (
                                    <React.Fragment>
                                        <Redirect from="/" to='/events' exact="exact"/>
                                        <Redirect from="/auth" to='events' exact="exact"/>
                                        <Route path="/auth" component={AuthPage}/>
                                        <Route path="/events" component={EventsPage}/>
                                        <Route path="/bookings" component={BookingsPage}/>
                                    </React.Fragment>
                                )
                            }
                        </Switch>
                    </main>
                </AuthContext.Provider>
            </BrowserRouter>
        );
    }
}

export default App;
