interface InitialAuthState {
  user: null;
}

export const initialAuthState = {
  user: null,
};

export const authReducer = (state: InitialAuthState, action: any) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case "logout":
      localStorage.clear();
      return { ...state, user: null };
    default:
      return state;
  }
};
