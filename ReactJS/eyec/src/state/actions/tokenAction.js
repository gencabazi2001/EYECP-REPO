export const setToken = (token) =>{
  return {
    type: "token",
    payload: token
  }
}

export const unsetToken = () =>{
  return {
    type: "notoken",
  }
}