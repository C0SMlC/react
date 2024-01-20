import { useContext, createContext } from "react";
import propTypes from "prop-types";

const FakeUserAuthenticationContext = createContext();

function FakeUserAuthenticationProvider({ children }) {
  return (
    <FakeUserAuthenticationContext.Provider>
      {children}
    </FakeUserAuthenticationContext.Provider>
  );
}

function useFakeUserAuthentication() {
  const context = useContext(FakeUserAuthenticationContext);

  if (context === undefined) {
    throw new Error(
      "useFakeUserAuthentication must be used within a CitiesProvider"
    );
  }

  return context;
}

// prop validation
FakeUserAuthenticationProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { useFakeUserAuthentication, FakeUserAuthenticationProvider };
