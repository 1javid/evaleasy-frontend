import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Container, Typography, Box, Tabs, Tab, Grid } from "@mui/material";
import { getSubjectById, listQuestionPoolsBySubject, getGroupIdsBySubjectId, getTestsByGroupId } from "../../services/authService";
import CreateQuestionPool from "./CreateQuestionPool";
import QuestionPoolCard from "./QuestionPoolCard";
import CreateTest from "./CreateTest";
import TestCard from "./TestCard";
import AssessmentTab from "./AssessmentTab";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Shared/LanguageSwitcher";

const SubjectDetails = () => {
  const id = window.location.pathname.split("/").pop(); // Extracts ID from URL
  const [value, setValue] = useState(0);
  const [subject, setSubject] = useState(null);
  const [questionPools, setQuestionPools] = useState([]);
  const [tests, setTests] = useState([]);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await getSubjectById(id);
        setSubject(response.data);
      } catch (err) {
        setError(err.response?.data || t("failed_to_fetch_subject"));
      }
    };

    const fetchQuestionPools = async () => {
      try {
        const response = await listQuestionPoolsBySubject(id);
        setQuestionPools(response.data);
      } catch (err) {
        setError(err.response?.data || t("failed_to_fetch_question_pools"));
      }
    };

    const fetchTests = async () => {
      try {
        const groupIdsResponse = await getGroupIdsBySubjectId(id);
        const groupIds = groupIdsResponse.data.map((group) => group.group_id);
        const testsPromises = groupIds.map((groupId) => getTestsByGroupId(groupId));
        const testsResponses = await Promise.all(testsPromises);
        const testsData = testsResponses.map((response) => response.data).flat();
        setTests(testsData);
      } catch (err) {
        setError(err.response?.data || t("failed_to_fetch_tests"));
      }
    };

    fetchSubject();
    fetchQuestionPools();
    fetchTests();
  }, [id, t]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleQuestionPoolCreated = (questionPool) => {
    setQuestionPools((prev) => [...prev, questionPool]);
  };

  const handleTestCreated = (test) => {
    setTests((prev) => [...prev, test]);
  };

  const groupTestsByGroupId = (tests) => {
    const groupedTests = {};
    tests.forEach((test) => {
      if (!groupedTests[test.group_id]) {
        groupedTests[test.group_id] = {
          name: test.name,
          group_id: test.group_id,
          variants: [],
          download_link: test.download_link,
          test_ids: [],
        };
      }
      groupedTests[test.group_id].variants.push(test.variant);
      groupedTests[test.group_id].test_ids.push(test.assessment_id);
    });
    return Object.values(groupedTests);
  };

  const groupedTests = groupTestsByGroupId(tests);

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4, mb: 2 }}>
        <Typography variant="h4">{t("subject_details")}</Typography>
        <LanguageSwitcher />
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      {subject && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>
            {subject.name}
          </Typography>
          {subject.description && (
            <Typography variant="body2" color="textSecondary">
              {subject.description}
            </Typography>
          )}
        </>
      )}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
        <Tabs value={value} onChange={handleChange} aria-label="subject tabs">
          <Tab label={t("question_pool")} />
          <Tab label={t("test")} />
          <Tab label={t("assessment")} />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {value === 0 && (
          <>
            <CreateQuestionPool subjectId={id} onQuestionPoolCreated={handleQuestionPoolCreated} />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {questionPools.map((questionPool) => (
                <Grid item xs={12} sm={6} md={4} key={questionPool.id}>
                  <QuestionPoolCard questionPool={questionPool} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {value === 1 && (
          <>
            <CreateTest subjectId={id} onTestCreated={handleTestCreated} />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {groupedTests.map((testGroup) => (
                <Grid item xs={12} sm={6} md={4} key={testGroup.group_id}>
                  <TestCard testGroup={testGroup} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {value === 2 && <AssessmentTab />}
      </Box>
    </Container>
  );
};

export default SubjectDetails;
