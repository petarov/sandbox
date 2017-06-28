// actions (commands) that reducers will receive

export const selectLibrary = (libId) => {
  return {
    type: 'select_library',
    payload: libId
  };
};