export const setTrans = (transactions) =>{
  return {
    type: "SETTRANSACTIONS",
    payload: transactions
  }
}

export const unSetTrans = () =>{
  return {
    type: "UNSETTRANSACTIONS",
  }
}