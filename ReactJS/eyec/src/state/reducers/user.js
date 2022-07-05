const UserReducer = (state = {}, action)=>{
  switch(action.type){
    case 'SETUSER':
      return state = action.payload
      case 'UNSETUSER':
        return state = null
    default:
      return state = state;
  }
}
export default UserReducer