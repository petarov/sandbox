// Root Component
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Firebase from 'firebase';
import reducers from  './reducers';
import FirebaseCreds from './creds';
import AppWithNavigationState from './AppNavigator';

class App extends Component {

  componentWillMount() {
    Firebase.initializeApp(FirebaseCreds);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

export default App;