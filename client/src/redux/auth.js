const init = {
  handphone: "",
  password: "",
};

function userReducer(state = init, action) {
  //action adalah event yang terjadi
  if (action.type == "login") {
    return {
      ...state,
      id: action.payload.id,
      email: action.payload.email,
      name: action.payload.name,
      address: action.payload.address,
      avatar_url: action.payload.avatar_url,
      handphone: action.payload.handphone,
      // token: action.payload.token,
    };
  } else if (action.type == "logout") {
    return init;
  }

  return state;
}

export default userReducer;
