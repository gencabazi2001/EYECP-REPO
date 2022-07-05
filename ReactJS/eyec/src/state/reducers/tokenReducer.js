const TokenReducer = (state = "", action)=>{
  switch(action.type){
    case 'token':
      return state = action.payload
      case 'notoken':
        return state = null
    default:
      return state
  }
}
export default TokenReducer