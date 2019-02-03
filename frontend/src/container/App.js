import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';

import AppRaw from '../App';

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
