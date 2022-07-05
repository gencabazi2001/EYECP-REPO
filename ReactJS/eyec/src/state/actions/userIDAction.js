export const setUserID = (id) =>{
  return{
    type: "userid",
    payload: id
  }
}

export const unSetUserID = () =>{
  return{
    type: "nouserid",
  }
}
