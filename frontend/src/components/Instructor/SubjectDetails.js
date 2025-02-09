import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tabs, Tab, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getSubjectById, listQuestionPoolsBySubject, getGroupIdsBySubjectId, getTestsByGroupId } from '../../services/authService';
import CreateQuestionPool from './CreateQuestionPool';
import QuestionPoolCard from './QuestionPoolCard';
import CreateTest from './CreateTest';
import TestCard from './TestCard';
import AssessmentTab from './AssessmentTab';

const SubjectDetails = () => {
    const { id } = useParams();
    const [value, setValue] = useState(0);
    const [subject, setSubject] = useState(null);
    const [questionPools, setQuestionPools] = useState([]);
    const [tests, setTests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await getSubjectById(id);
                setSubject(response.data);
            } catch (err) {
                setError(err.response?.data || 'Failed to fetch subject details.');
            }
        };

        const fetchQuestionPools = async () => {
            try {
                const response = await listQuestionPoolsBySubject(id);
                setQuestionPools(response.data);
            } catch (err) {
                setError(err.response?.data || 'Failed to fetch question pools.');
            }
        };

        const fetchTests = async () => {
            try {
                const groupIdsResponse = await getGroupIdsBySubjectId(id);
                console.log('Group IDs:', groupIdsResponse.data);
                const groupIds = groupIdsResponse.data.map(group => group.group_id);
                console.log('Group IDs Array:', groupIds);
                const testsPromises = groupIds.map(groupId => {
                    console.log(`Fetching tests for group ID: ${groupId}`);
                    return getTestsByGroupId(groupId);
                });
                const testsResponses = await Promise.all(testsPromises);
                const testsData = testsResponses.map(response => response.data).flat();
                console.log('Tests Data:', testsData);
                setTests(testsData);
            } catch (err) {
                setError(err.response?.data || 'Failed to fetch tests.');
            }
        };

        fetchSubject();
        fetchQuestionPools();
        fetchTests();
    }, [id]);

    const handleChange = (event, newValue) => {
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
                    test_ids: []
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
            <Typography variant="h4" sx={{ mt: 4 }}>
                Subject Details
            </Typography>
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                <Tabs value={value} onChange={handleChange} aria-label="subject tabs">
                    <Tab label="Question Pool" />
                    <Tab label="Test" />
                    <Tab label="Assessment" />
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