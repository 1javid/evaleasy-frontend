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
          <Button color="inherit" onClick={handleLogout}>
            {t("logout")}
          </Button>
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
