exports.CreateWalletDTO = () => {
  return {
    UserID:"",
    Bilance:0.0,
    Active:true
  }
}

exports.GetWalletsDTO = () => {
  return {
    UserID:""
  }
}

exports.ChangeOwnerDTO = () => {
  return {
    OwnerUserID:"",
    NewOwnerUserID:"",
    WalletID:""
  }
}

exports.AuthenticateDTO = () => {
  return {
   postfix:""
  }
}