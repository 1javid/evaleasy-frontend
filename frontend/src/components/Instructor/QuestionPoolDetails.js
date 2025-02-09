// filepath: /d:/React/evaleasy-frontend/frontend/src/components/Instructor/QuestionPoolDetails.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { listQuestionsByQuestionPool } from '../../services/authService';
import CreateQuestion from './CreateQuestion';

const QuestionPoolDetails = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await listQuestionsByQuestionPool(id);
                setQuestions(response.data);
            } catch (err) {
                setError(err.response?.data || 'Failed to fetch questions.');
            }
        };

        fetchQuestions();
    }, [id]);

    const handleQuestionCreated = (question) => {
        setQuestions((prev) => [...prev, question]);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4 }}>
                Question Pool Details
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <CreateQuestion questionPoolId={id} onQuestionCreated={handleQuestionCreated} />
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

export default QuestionPoolDetails;