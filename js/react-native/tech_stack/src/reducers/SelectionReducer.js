export default (state = null, action) => {

  switch(action.type) {
    case 'select_library':
      return action.payload;

    default:
      // default state for unhandled actions
      return state;
  }
};