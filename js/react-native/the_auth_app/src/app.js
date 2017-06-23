// bootstrap

import firebase from 'firebase';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {
    loggedIn: null
  };

  componentWillMount() {
    console.log('Init firebsase ...');
    firebase.initializeApp({
      apiKey: 'AIzaSyBlWNIR4i185RdVab2wrXAToMmwUSQq6n8',
      authDomain: 'the-auth-app-ae219.firebaseapp.com',
      databaseURL: 'https://the-auth-app-ae219.firebaseio.com',
      projectId: 'the-auth-app-ae219',
      storageBucket: 'the-auth-app-ae219.appspot.com',
      messagingSenderId: '974649833495'
    });

    // watch login events and set state
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Sign out
          </Button>
        );
      case false:
        return <LoginForm />;
      
      default:
        return (
          <View>
            <Spinner size='large' />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerTitle="Authentication" />
        {this.renderContent()}
      </View>
    );
  }

}

export default App;