import { h } from "preact";
import { useTranslation } from "react-i18next";
import { Button, Box } from "@mui/material";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // Save to localStorage
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
      <Button
        onClick={() => changeLanguage("en")}
        sx={{ borderRadius: "12px", border: "1px solid #ccc", mx: 1 }}
      >
        EN
      </Button>
      <Button
        onClick={() => changeLanguage("ru")}
        sx={{ borderRadius: "12px", border: "1px solid #ccc", mx: 1 }}
      >
        RU
      </Button>
      <Button
        onClick={() => changeLanguage("az")}
        sx={{ borderRadius: "12px", border: "1px solid #ccc", mx: 1 }}
      >
        AZ
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;