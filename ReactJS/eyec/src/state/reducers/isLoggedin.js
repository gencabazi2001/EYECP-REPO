const IsLoggedInReducer = (state = false, action)=>{
  switch(action.type){
    case 'LOGIN':
      return state = true
    case 'LOGOUT':
      return state = false
    case 'SETLOGIN':
      return state = action.payload
    default:
      return state
  }
}
export default IsLoggedInReducer