import firebase from 'firebase';
import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

// Async Action
export const loginUser = ({ email, password }) => {
  // manually dispatch action, as soon as remote request completes
  return (dispatch) => {
    // flag that login has started
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user)).catch(() => {
      // new user
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      // create new user fails
      .catch(() => loginUserFailed(dispatch));
    });
  };
};

const loginUserFailed = (dispatch) => {
  dispatch({ 
    type: LOGIN_USER_FAILED
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({ 
    type: LOGIN_USER_SUCCESS, 
    payload: user 
  });
};