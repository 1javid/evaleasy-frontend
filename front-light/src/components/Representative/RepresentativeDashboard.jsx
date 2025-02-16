import { h } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";
import { Container, Typography, Box, Grid } from "@mui/material";
import CreateInstructor from "./CreateInstructor";
import { listInstructorsByInstitution } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Shared/LanguageSwitcher";

const RepresentativeDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [instructors, setInstructors] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await listInstructorsByInstitution(auth.institution_id);
        setInstructors(response.data);
      } catch (err) {
        console.error(t("failed_to_fetch_instructors"), err);
      }
    };

    fetchInstructors();
  }, [auth.institution_id, t]);

  const handleInstructorCreated = (instructor) => {
    setInstructors((prev) => [...prev, instructor]);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4, mb: 2 }}>
        <Typography variant="h4">{t("representative_dashboard")}</Typography>
        <LanguageSwitcher />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">{t("create_instructor")}</Typography>
        <CreateInstructor institutionId={auth.institution_id} onInstructorCreated={handleInstructorCreated} />
      </Box>
      <Typography variant="h5" sx={{ mt: 4 }}>
        {t("instructors")}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {instructors.map((inst) => (
          <Grid item xs={12} sm={6} md={4} key={inst.id}>
            <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
              <Typography variant="h6">
                {inst.first_name} {inst.last_name}
              </Typography>
              <Typography variant="body2">
                {t("email")}: {inst.email}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RepresentativeDashboard;
