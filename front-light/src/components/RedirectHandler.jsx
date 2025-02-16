import { h } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { route } from "preact-router";
import { AuthContext } from "../context/AuthContext";

const RedirectHandler = () => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) {
      route("/login", true);
    } else {
      const userType = auth.user_type.toLowerCase();
      const currentPath = window.location.pathname;

      if (userType === "admin" && currentPath !== "/admin" && !currentPath.startsWith("/institution/")) {
        route("/admin", true);
      } else if (userType === "institution representative" && currentPath !== "/representative") {
        route("/representative", true);
      } else if (
        userType === "instructor" &&
        currentPath !== "/instructor" &&
        !currentPath.startsWith("/subject/") &&
        !currentPath.startsWith("/question-pool/") &&
        !currentPath.startsWith("/test/") &&
        !currentPath.startsWith("/assessment/")
      ) {
        route("/instructor", true);
      }
    }
  }, [auth]);

  return null;
};

export default RedirectHandler;