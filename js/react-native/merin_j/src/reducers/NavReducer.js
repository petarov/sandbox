// Handles all navigation stuff
import { 
  NAV_LOGIN,
  NAV_LOGOUT
} from '../actions/types';
import { AppNavigator } from '../AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Login');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Logout');
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction
);

export default NavReducer = (state = initialNavState, action) => {
  let nextState;
  console.log(action);

  switch (action.type) {
    case NAV_LOGIN:
      // nextState = AppNavigator.router.getStateForAction(
      //   NavigationActions.back(),
      //   state
      // );
      break;

    case NAV_LOGOUT:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Logout' }),
        state
      );
      break;

    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};