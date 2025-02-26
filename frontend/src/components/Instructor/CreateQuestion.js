import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { createQuestion } from '../../services/authService';
import { AddCircleOutline, RemoveCircleOutline, AutoAwesome } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import AiQuestionGenerator from './AiQuestionGenerator';

const CreateQuestion = ({ questionPoolId, onQuestionCreated }) => {
    const [text, setText] = useState('');
    const [defaultScore, setDefaultScore] = useState('');
    const [answers, setAnswers] = useState([{ text: '', is_correct: false }]);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const [aiGeneratorOpen, setAiGeneratorOpen] = useState(false);

    const handleAddAnswer = () => {
        setAnswers([...answers, { text: '', is_correct: false }]);
    };

    const handleRemoveAnswer = (index) => {
        const newAnswers = answers.filter((_, i) => i !== index);
        setAnswers(newAnswers);
    };

    const handleAnswerChange = (index, field, value) => {
        const newAnswers = [...answers];
        newAnswers[index][field] = value;
        setAnswers(newAnswers);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await createQuestion({
                question_pool: questionPoolId,
                text,
                default_score: defaultScore,
                answers
            });
            // Reset form on success
            setText('');
            setDefaultScore('');
            setAnswers([{ text: '', is_correct: false }]);
            setError(null);
            alert(t('question_created_successfully'));
            onQuestionCreated(response.data);
        } catch (err) {
            setError(t('failed_to_create_question'));
        }
    };

    const handleAiQuestionsGenerated = async (aiGeneratedQuestions) => {
        // Create multiple questions in sequence
        try {
            for (const question of aiGeneratedQuestions) {
                const response = await createQuestion(question);
                onQuestionCreated(response.data);
            }
            alert(t('ai_questions_added_successfully'));
        } catch (err) {
            setError(t('failed_to_add_ai_questions'));
        }
    };

    return (
        <>
            <Box component="form" onSubmit={handleCreate} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">{t('create_question')}</Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<AutoAwesome />}
                        onClick={() => setAiGeneratorOpen(true)}
                    >
                        {t('use_ai')}
                    </Button>
                </Box>

                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label={t('question_text')}
                    fullWidth
                    margin="normal"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <TextField
                    label={t('default_score')}
                    fullWidth
                    margin="normal"
                    value={defaultScore}
                    onChange={(e) => setDefaultScore(e.target.value)}
                    required
                />
                <Typography variant="body2" sx={{ mt: 2 }}>
                    {t('answers')}:
                </Typography>
                {answers.map((answer, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <TextField
                            label={`${t('answer')} ${index + 1}`}
                            fullWidth
                            margin="normal"
                            value={answer.text}
                            onChange={(e) => handleAnswerChange(index, 'text', e.target.value)}
                            required
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={answer.is_correct}
                                    onChange={(e) => handleAnswerChange(index, 'is_correct', e.target.checked)}
                                />
                            }
                            label={t('correct')}
                            sx={{ ml: 2 }}
                        />
                        <IconButton onClick={() => handleRemoveAnswer(index)} sx={{ ml: 2 }}>
                            <RemoveCircleOutline />
                        </IconButton>
                    </Box>
                ))}
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    {t('create_question')}
                </Button>
                <Button variant="outlined" color="primary" onClick={handleAddAnswer} sx={{ mt: 2, ml: 2 }}>
                    <AddCircleOutline /> {t('add_answer')}
                </Button>
            </Box>

            <AiQuestionGenerator
                open={aiGeneratorOpen}
                onClose={() => setAiGeneratorOpen(false)}
                questionPoolId={questionPoolId}
                onQuestionsGenerated={handleAiQuestionsGenerated}
            />
        </>
    );
};

export default CreateQuestion;