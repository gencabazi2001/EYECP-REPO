const TransactionReducer = (state = {}, action)=>{
  switch(action.type){
    case 'SETTRANSACTIONS':
      return state = action.payload
      case 'UNSETTRANSACTIONS':
        return state = null
    default:
      return state
  }
}
export default TransactionReducer