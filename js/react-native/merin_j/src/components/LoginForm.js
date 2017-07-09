// depends on redux
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  emailChanged, passwordChanged, loginUser 
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

  constructor() {
    super();
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onSignInPress(text) {
    const { email, password } = this.props;
    this.props.loginUser({ email, password })
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />
    }

    return (
      <Button 
        onPress={this.onSignInPress.bind(this)}>
        Sign In
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input label="Email" 
            hint="user@example.org" 
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input label="Password" 
            secure 
            hint="password" 
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }

}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignItems: 'center',
    color: 'red'
  }
};

//const mapStateToProps = state => {
const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return {
    email,
    password,
    error,
    loading
  };
};

LoginForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};
LoginForm.navigationOptions = {
  title: 'App Sign In'
};

export default connect(mapStateToProps, { 
  emailChanged, passwordChanged, loginUser 
})(LoginForm);