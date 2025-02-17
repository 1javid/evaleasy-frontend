import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RedirectHandler = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!auth) {
            if (location.pathname !== "/login") {
                navigate("/login", { replace: true });
            }
            return;
        }

        const userType = auth.user_type.toLowerCase();
        const currentPath = location.pathname;

        // Define correct paths for each user type
        const userPaths = {
            admin: ["/admin", "/institution"],
            "institution representative": ["/representative"],
            instructor: [
                "/instructor",
                "/subject/",
                "/question-pool/",
                "/test/",
                "/assessment/",
            ],
        };

        // Check if user is on the correct path
        const isOnCorrectPath = userPaths[userType]?.some((path) =>
            currentPath.startsWith(path)
        );

        if (!isOnCorrectPath) {
            navigate(userPaths[userType][0], { replace: true });
        }
    }, [auth, navigate, location.pathname]);

    return null;
};

export default RedirectHandler;
