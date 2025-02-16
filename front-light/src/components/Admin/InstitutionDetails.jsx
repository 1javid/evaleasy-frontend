import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Container, Typography, Box, Grid } from "@mui/material";
import CreateRepresentative from "./CreateRepresentative";
import { listRepresentativesByInstitution } from "../../services/authService";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Shared/LanguageSwitcher";

const InstitutionDetails = () => {
  const id = window.location.pathname.split("/").pop(); // Extracts ID from URL
  const [representatives, setRepresentatives] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRepresentatives = async () => {
      try {
        const response = await listRepresentativesByInstitution(id);
        setRepresentatives(response.data);
      } catch (err) {
        console.error(t("failed_to_fetch_representatives"), err);
      }
    };

    fetchRepresentatives();
  }, [id, t]);

  const handleRepresentativeCreated = (representative) => {
    setRepresentatives((prev) => [...prev, representative]);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4, mb: 2 }}>
        <Typography variant="h4">{t("institution_details")}</Typography>
        <LanguageSwitcher />
      </Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        {t("institution_id")}: {id}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">{t("create_representative")}</Typography>
        <CreateRepresentative institutionId={id} onRepresentativeCreated={handleRepresentativeCreated} />
      </Box>
      <Typography variant="h5" sx={{ mt: 4 }}>
        {t("representatives")}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {representatives.map((rep) => (
          <Grid item xs={12} sm={6} md={4} key={rep.user_id}>
            <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
              <Typography variant="h6">
                {rep.first_name} {rep.last_name}
              </Typography>
              <Typography variant="body2">
                {t("email")}: {rep.email}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default InstitutionDetails;
