import { h } from "preact";
import { useContext } from "preact/hooks";
import { AuthContext } from "../context/AuthContext";
import { route } from "preact-router";

const PrivateRoute = ({ component: Component, allowedRoles, ...props }) => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    route("/login", true);
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(auth.user_type.toLowerCase())) {
    route("/", true);
    return null;
  }

  return <Component {...props} />;
};

export default PrivateRoute;
