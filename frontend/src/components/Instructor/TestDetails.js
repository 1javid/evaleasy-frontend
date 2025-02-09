import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getTestById, getTestQuestions } from '../../services/authService';

const TestDetails = () => {
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await getTestById(id);
                setTest(response.data);
            } catch (err) {
                setError(err.response?.data || 'Failed to fetch test details.');
            }
        };

        const fetchQuestions = async () => {
            try {
                const response = await getTestQuestions(id);
                setQuestions(response.data);
            } catch (err) {
                setError(err.response?.data || 'Failed to fetch test questions.');
            }
        };

        fetchTest();
        fetchQuestions();
    }, [id]);

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4 }}>
                Test Details
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            {test && (
                <>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {test.name}
                    </Typography>
                    {test.notes && (
                        <Typography variant="body2" color="textSecondary">
                            Notes: {test.notes}
                        </Typography>
                    )}
                    {test.instructions && (
                        <Typography variant="body2" color="textSecondary">
                            Instructions: {test.instructions}
                        </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                        Variant: {test.variant}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Group ID: {test.group_id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Assessment ID: {test.assessment_id}
                    </Typography>
                </>
            )}
            <Typography variant="h5" sx={{ mt: 4 }}>
                Questions
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {questions.map((question) => (
                    <Grid item xs={12} key={question.id}>
                        <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
                            <Typography variant="h6">{question.text}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Default Score: {question.default_score}
                            </Typography>
                            {question.answers.map((answer, index) => (
                                <Typography key={index} variant="body2" color={answer.is_correct ? 'primary' : 'textSecondary'}>
                                    {`Answer ${index + 1}: ${answer.text}`}
                                </Typography>
                            ))}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TestDetails;