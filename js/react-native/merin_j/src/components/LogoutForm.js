// depends on redux
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  emailChanged, passwordChanged, loginUser 
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LogoutForm extends Component {

  constructor() {
    super();    
  }

  render() {
    return (
      <View>
        <Text>Log out</Text>
      </View>
    );
  }

}

LogoutForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};
LogoutForm.navigationOptions = {
  title: 'App Sign Out'
};

export default connect(null)(LogoutForm);