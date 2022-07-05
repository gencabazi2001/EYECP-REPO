const UserIDReducer = (state = {}, action) => {
  switch (action.type) {
    case "nouserid":
      return (state = null);
    case "userid":
      return (state = action.payload);
    default:
      return state 
  }
};
export default UserIDReducer;
