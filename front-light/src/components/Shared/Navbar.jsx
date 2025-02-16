import { h } from "preact";
import { useContext } from "preact/hooks";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { route } from "preact-router";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    route("/login"); // Preact-router's navigation function
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SmartEval
        </Typography>
        {auth ? (
          <Box>
            {auth.user_type.toLowerCase() === "admin" && (
              <Button color="inherit" href="/admin">
                {t("admin_dashboard")}
              </Button>
            )}
            {auth.user_type.toLowerCase() === "institution representative" && (
              <Button color="inherit" href="/representative">
                {t("representative_dashboard")}
              </Button>
            )}
            {auth.user_type.toLowerCase() === "instructor" && (
              <Button color="inherit" href="/instructor">
                {t("instructor_dashboard")}
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              {t("logout")}
            </Button>
          </Box>
        ) : (
          <Button color="inherit" href="/login">
            {t("login")}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
