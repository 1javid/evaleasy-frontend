import React, { useState, useContext } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';

const AiQuestionGenerator = ({ open, onClose, questionPoolId, onQuestionsGenerated }) => {
    const { auth } = useContext(AuthContext);
    const { t } = useTranslation();
    const [subject, setSubject] = useState('');
    const [difficulty, setDifficulty] = useState('Medium');
    const [numQuestions, setNumQuestions] = useState(3);
    const [numAnswers, setNumAnswers] = useState(4);
    const [language, setLanguage] = useState('en');
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generatedQuestions, setGeneratedQuestions] = useState(null);

    const handleGenerateQuestions = () => {
        setLoading(true);
        setError(null);

        const requestPayload = {
            teacher_id: Number(auth.user_id),
            subject,
            difficulty,
            num_questions: Number(numQuestions),
            num_answers: Number(numAnswers),
            language,
            feedback: feedback || null
        };

        console.log('Sending request payload:', requestPayload);

        axios.post(
            'https://gateway.smarteval.tech/api/ai/generate/',
            requestPayload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => {
                console.log('Received response:', response.data);
                setGeneratedQuestions(response.data);
                if (feedback) setFeedback('');
            })
            .catch(err => {
                console.log('API request failed - raw error:', err);
                console.log('Status:', err.response?.status);
                console.log('Data:', err.response?.data);
                console.log('Headers:', err.response?.headers);
                setError('Request failed, see console for details');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleAddToQuestionPool = () => {
        if (generatedQuestions && generatedQuestions.questions) {
            const requestPayload = {
                questions: generatedQuestions.questions.map(q => ({
                    ...q,
                    question_pool: questionPoolId
                }))
            };

            axios.post(
                `https://gateway.smarteval.tech/api/test/questions/bulk/${questionPoolId}/`,
                requestPayload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(response => {
                    console.log('Questions added successfully:', response.data);
                    onQuestionsGenerated(response.data.questions);
                    onClose();
                })
                .catch(err => {
                    console.error('Failed to add questions - raw error:', err);
                    if (err.response) {
                        console.error('Status:', err.response.status);
                        console.error('Data:', err.response.data);
                        console.error('Headers:', err.response.headers);
                    }
                    setError('Failed to add AI-generated questions. Please check the console for more details.');
                });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{t('generate_questions_with_ai')}</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

                    <TextField
                        label={t('context')}
                        fullWidth
                        margin="normal"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel shrink>{t('difficulty')}</InputLabel>
                        <Select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            label={t('difficulty')}
                        >
                            <MenuItem value="Easy">{t('easy')}</MenuItem>
                            <MenuItem value="Medium">{t('medium')}</MenuItem>
                            <MenuItem value="Hard">{t('hard')}</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel shrink>{t('language')}</InputLabel>
                        <Select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            label={t('language')}
                        >
                            <MenuItem value="en">{t('english')}</MenuItem>
                            <MenuItem value="ru">{t('russian')}</MenuItem>
                            <MenuItem value="az">{t('azerbaijani')}</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label={t('number_of_questions')}
                        type="number"
                        fullWidth
                        margin="normal"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                        required
                    />

                    <TextField
                        label={t('answers_per_question')}
                        type="number"
                        fullWidth
                        margin="normal"
                        value={numAnswers}
                        onChange={(e) => setNumAnswers(parseInt(e.target.value))}
                        InputProps={{ inputProps: { min: 2, max: 5 } }}
                        required
                    />

                    {generatedQuestions && (
                        <TextField
                            label={t('feedback_for_improvement')}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={2}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGenerateQuestions}
                        disabled={loading || !subject}
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> :
                            feedback ? t('regenerate_questions') : t('generate_questions')}
                    </Button>
                </Box>

                {generatedQuestions && generatedQuestions.questions && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6">{t('generated_questions')}</Typography>
                        <Divider sx={{ my: 1 }} />

                        {generatedQuestions.questions.map((question, qIndex) => (
                            <Card key={qIndex} sx={{ mb: 2, mt: 2 }}>
                                <CardContent>
                                    <Typography variant="subtitle1">
                                        <strong>{qIndex + 1}. {question.text}</strong>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {t('default_score')}: {question.default_score}
                                    </Typography>

                                    {question.answers.map((answer, aIndex) => (
                                        <Typography
                                            key={aIndex}
                                            variant="body2"
                                            color={answer.is_correct ? "primary" : "textSecondary"}
                                        >
                                            {String.fromCharCode(65 + aIndex)}. {answer.text}
                                            {answer.is_correct && ` (✓)`}
                                        </Typography>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}

                {generatedQuestions && generatedQuestions.error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {generatedQuestions.error}
                    </Typography>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>{t('cancel')}</Button>
                {generatedQuestions && generatedQuestions.questions && (
                    <Button
                        onClick={handleAddToQuestionPool}
                        color="primary"
                        variant="contained"
                    >
                        {t('add_to_question_pool')}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AiQuestionGenerator;