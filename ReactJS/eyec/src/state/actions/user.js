export const setUser = (user) =>{
  return {
    type: "SETUSER",
    payload: user
  }
}

export const unSetUser = () =>{
  return {
    type: "UNSETUSER",
  }
}