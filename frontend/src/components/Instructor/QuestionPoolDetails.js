import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { listQuestionsByQuestionPool } from '../../services/authService';
import CreateQuestion from './CreateQuestion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../Shared/LanguageSwitcher';

const QuestionPoolDetails = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await listQuestionsByQuestionPool(id);
                setQuestions(response.data);
            } catch (err) {
                setError(err.response?.data || t('failed_to_fetch_questions'));
            }
        };

        fetchQuestions();
    }, [id, t]);

    const handleQuestionCreated = (question) => {
        setQuestions((prev) => [...prev, question]);
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
                <Typography variant="h4">
                    {t('question_pool_details')}
                </Typography>
                <LanguageSwitcher />
            </Box>
            {error && <Typography color="error">{error}</Typography>}
            <CreateQuestion questionPoolId={id} onQuestionCreated={handleQuestionCreated} />
            <Typography variant="h5" sx={{ mt: 4 }}>
                {t('questions')}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {questions.map((question) => (
                    <Grid item xs={12} key={question.id}>
                        <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
                            <Typography variant="h6">{question.text}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {t('default_score')}: {question.default_score}
                            </Typography>
                            {question.answers.map((answer, index) => (
                                <Typography key={index} variant="body2" color={answer.is_correct ? 'primary' : 'textSecondary'}>
                                    {`${t('answer')} ${index + 1}: ${answer.text}`}
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