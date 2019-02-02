import React from 'react';
import {NavLink} from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => (
    <AuthContext.Consumer>
        {
            (context) => {
                return (
                    <header className="main-navigation">
                        <div className="main-navigation__logo">
                            <h1>Easy Event</h1>
                        </div>
                        <nav className="main-navigation__items">
                            <ul>
                                {
                                    !context.token && (
                                        <li>
                                            <NavLink to="/auth">Authentication</NavLink>
                                        </li>
                                    )
                                }

                                <li>
                                    <NavLink to="/events">Event</NavLink>
                                </li>
                                {
                                    context.token && (
                                        <li>
                                            <NavLink to="/bookings">Booking</NavLink>
                                        </li>
                                    )
                                }

                            </ul>
                        </nav>

                    </header>
                )
            }
        }

    </AuthContext.Consumer>
);

export default mainNavigation;