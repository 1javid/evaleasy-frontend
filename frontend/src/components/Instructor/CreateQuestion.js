import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { createQuestion } from '../../services/authService';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const CreateQuestion = ({ questionPoolId, onQuestionCreated }) => {
    const [text, setText] = useState('');
    const [defaultScore, setDefaultScore] = useState('');
    const [answers, setAnswers] = useState([{ text: '', is_correct: false }]);
    const [error, setError] = useState(null);

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
            alert('Question created successfully!');
            onQuestionCreated(response.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to create question.');
        }
    };

    return (
        <Box component="form" onSubmit={handleCreate} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Question Text"
                fullWidth
                margin="normal"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
            <TextField
                label="Default Score"
                fullWidth
                margin="normal"
                value={defaultScore}
                onChange={(e) => setDefaultScore(e.target.value)}
                required
            />
            <Typography variant="body2" sx={{ mt: 2 }}>
                Answers:
            </Typography>
            {answers.map((answer, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <TextField
                        label={`Answer ${index + 1}`}
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
                        label="Correct"
                        sx={{ ml: 2 }}
                    />
                    <IconButton onClick={() => handleRemoveAnswer(index)} sx={{ ml: 2 }}>
                        <RemoveCircleOutline />
                    </IconButton>
                </Box>
            ))}
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Create Question
            </Button>
            <Button variant="outlined" color="primary" onClick={handleAddAnswer} sx={{ mt: 2, ml: 2 }}>
                <AddCircleOutline /> Add Answer
            </Button>
        </Box>
    );
};

export default CreateQuestion;