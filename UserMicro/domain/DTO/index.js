exports.StoreDTO = () => {
  return { Name: "", Username: "", Email: "", Password: "", DOB: "" };
};

exports.UserIDDTO = () => {
  return {
    UserID: "",
  };
};

exports.ReturnUserDTO = () => {
  return {
    Name: "",
    username: "",
    email: "",
    DOB: "",
    verified: false,
    settings: {},
    details: {},
    tags: {},
  };
};

exports.AddSettingsDTO = () => {
  return {
    UserID: "",
    DarkMode: false,
    IsPrivate: false,
  };
};

exports.AddDetailsDTO = () => {
  return {
    UserID: "",
    ProfileImage: "",
    BackgroundImage: "",
    Bio: "",
    Url: "",
  };
};

exports.AddPreferenceDTO = () => {
  return {
    UserID: "",
    Tag: "",
    TagDesc: "",
  };
};
exports.AddFollowDTO = () => {
  return {
    Follower: "",
    Following: "",
  };
};

exports.AddBlockDTO = () => {
  return {
    Blocker: "",
    Blocked: "",
  };
};

exports.LoginDTO = () => {
  return {
    Email: "",
    Password: "",
  };
};

exports.LoginReturnDTO = () => {
  return {
    ID: "",
    Email: "",
    Username: "",
    Name: "",
    Password: "",
  };
};

exports.TerminateUserDTO = () => {
  return {
    AdminID: "",
    UserID: "",
  };
};

exports.ValidationDTO = () => {
  return {
    validationString:""
  }
}
