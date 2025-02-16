import { h } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";
import { Container, Typography, Grid, Box } from "@mui/material";
import CreateSubject from "./CreateSubject";
import SubjectCard from "./SubjectCard";
import { listSubjects } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Shared/LanguageSwitcher";

const InstructorDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await listSubjects(auth.user_id);
        setSubjects(response.data);
      } catch (err) {
        console.error(t("failed_to_fetch_subjects"), err);
      }
    };

    fetchSubjects();
  }, [auth.user_id, t]);

  const handleSubjectCreated = (subject) => {
    setSubjects((prev) => [...prev, subject]);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4, mb: 2 }}>
        <Typography variant="h4">{t("instructor_dashboard")}</Typography>
        <LanguageSwitcher />
      </Box>
      <CreateSubject onSubjectCreated={handleSubjectCreated} />
      <Typography variant="h5" sx={{ mt: 4 }}>
        {t("subjects")}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {subjects.map((subject) => (
          <Grid item xs={12} sm={6} md={4} key={subject.id}>
            <SubjectCard subject={subject} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default InstructorDashboard;
