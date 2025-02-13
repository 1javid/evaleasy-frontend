import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getTestById, getTestQuestions } from '../../services/authService';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../Shared/LanguageSwitcher';

const TestDetails = () => {
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await getTestById(id);
                setTest(response.data);
            } catch (err) {
                setError(err.response?.data || t('failed_to_fetch_test_details'));
            }
        };

        const fetchQuestions = async () => {
            try {
                const response = await getTestQuestions(id);
                setQuestions(response.data);
            } catch (err) {
                setError(err.response?.data || t('failed_to_fetch_test_questions'));
            }
        };

        fetchTest();
        fetchQuestions();
    }, [id, t]);

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
                <Typography variant="h4">
                    {t('test_details')}
                </Typography>
                <LanguageSwitcher />
            </Box>
            {error && <Typography color="error">{error}</Typography>}
            {test && (
                <>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {test.name}
                    </Typography>
                    {test.notes && (
                        <Typography variant="body2" color="textSecondary">
                            {t('notes')}: {test.notes}
                        </Typography>
                    )}
                    {test.instructions && (
                        <Typography variant="body2" color="textSecondary">
                            {t('instructions')}: {test.instructions}
                        </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                        {t('variant')}: {test.variant}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {t('group_id')}: {test.group_id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {t('assessment_id')}: {test.assessment_id}
                    </Typography>
                </>
            )}
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

export default TestDetails;