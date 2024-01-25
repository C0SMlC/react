import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

import { useUserAuthentication } from "../contexts/FakeUserAuthentication";

function ProtectedRoute({ children }) {
  const navigator = useNavigate();
  const { isAuthenticated } = useUserAuthentication();
  useEffect(
    function () {
      if (!isAuthenticated) {
        navigator("/");
      }
    },
    [isAuthenticated, navigator]
  );
  return isAuthenticated ? children : null;
}

ProtectedRoute.propTypes = {
  children: propTypes.node.isRequired,
};

export default ProtectedRoute;
