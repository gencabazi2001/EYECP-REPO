export const login =()=>{
  return{
    type:'LOGIN'
  }
}
export const logout =()=>{
  return{
    type:'LOGOUT'
  }
}
export const setLogin =(ls)=>{
  return{
    type:'SETLOGIN',
    payload: ls

  }
}

