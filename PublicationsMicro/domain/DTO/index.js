exports.PublishDTO = () => {
  return{
    UserID:"",
    Caption:"",
    File:"",
    Tags:[],
    Latitude:0.0,
    Longitude:0.0
  }
}

exports.LikeDTO = () => {
  return{
    UserID:"",
    PubID:""
  }
}

exports.CommentDTO = () => {
  return{
    UserID:"",
    PubID:"",
    Comment:""
  }
}

exports.PubIDDTO = () => {
  return{
    PubID:""
  }
}

exports.UserIDDTO = () => {
  return{
    UserID:""
  }
}

exports.LikeCommentDTO = () => {
  return {
    PubID:"",
    UserID:"",
    CommentID:""
  }
}


exports.AddPreferenceDTO = () => {
  return {
    UserID:"",
    Tag:"",
    TagDesc:""
  }
}
exports.RegisterUserDTO = () => {
  return{
    UserID:"",
    IsPrivate:false,
    Username:"",
    ProfileImage:""
  }
}