exports.CreateWalletDTO = () => {
  return {
    UserID:"",
    Balance:0.0,
    Active:true
  }
}

exports.DeleteWalletDTO = () => {
  return {
    WalletID:""
  }
}

exports.GetWalletsDTO = () => {
  return {
    UserID:""
  }
}

exports.GetTransactionsDTO = () => {
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