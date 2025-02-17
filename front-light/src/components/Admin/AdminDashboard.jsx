import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Container, Typography, Box, Grid } from "@mui/material";
import CreateInstitution from "./CreateInstitution";
import InstitutionCard from "./InstitutionCard";
import { listInstitutions } from "../../services/authService";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Shared/LanguageSwitcher";

const AdminDashboard = () => {
  const [institutions, setInstitutions] = useState([]);
  const { t } = useTranslation();

  // Fetch existing institutions when the component mounts
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await listInstitutions();
        setInstitutions(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // If the error is a 404, set institutions to an empty array
          setInstitutions([]);
        } else {
          console.error(t("failed_to_fetch_institutions"), err);
        }
      }
    };

    fetchInstitutions();
  }, [t]);

  // Callback when a new institution is created
  const handleInstitutionCreated = (institution) => {
    setInstitutions((prev) => [...prev, institution]);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4, mb: 2 }}>
        <Typography variant="h4">{t("admin_dashboard")}</Typography>
        <LanguageSwitcher />
      </Box>
      <CreateInstitution onInstitutionCreated={handleInstitutionCreated} />
      <Typography variant="h5" sx={{ mt: 4 }}>
        {t("institutions")}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {institutions.map((inst) => (
          <Grid item xs={12} sm={6} md={4} key={inst.id}>
            <InstitutionCard institution={inst} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;