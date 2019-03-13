import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {setCurrentUser,addError,setToken} from '../store/actions';

import AppRaw from '../App';

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(localStorage.jwtToken));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(err));
  }
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRaw />
      </Provider>
    )
  }
}

export default App;
