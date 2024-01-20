import { useContext, createContext, useReducer } from "react";
import PropTypes from "prop-types";

const UserAuthenticationContext = createContext();

// Initialize the authentication state
const INITIAL_STATE = {
  user: {},
  isAuthenticated: false,
};

// Define the fake user
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// Define the reducer function for updating the authentication state
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

function UserAuthenticationProvider({ children }) {
  // Initialize the authentication state using the reducer
  const [{ user, isAuthenticated }, dispatch] = useReducer({
    reducer,
    INITIAL_STATE,
  });

  // Define the login function
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER }); // Update the authentication state
    }
  }

  // Define the logout function
  function logout() {
    dispatch({ type: "logout" }); // Update the authentication state
  }

  // Provide the authentication state to the component tree
  return (
    <UserAuthenticationContext.Provider
      value={{ user, isAuthenticated, login, logout }}
    >
      {children}
    </UserAuthenticationContext.Provider>
  );
}

UserAuthenticationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useUserAuthentication() {
  const context = useContext(UserAuthenticationContext);

  if (context === undefined) {
    throw new Error(
      "useUserAuthentication must be used within a UserAuthenticationProvider"
    );
  }

  return context;
}

export { useUserAuthentication, UserAuthenticationProvider };
