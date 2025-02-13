import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { createQuestionPool } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const CreateQuestionPool = ({ subjectId, onQuestionPoolCreated }) => {
    const { auth } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await createQuestionPool({
                subject: subjectId,
                name,
                description,
                instructor_id: auth.user_id
            });
            // Reset form on success
            setName('');
            setDescription('');
            setError(null);
            alert(t('question_pool_created_successfully'));
            onQuestionPoolCreated(response.data);
        } catch (err) {
            setError(t('failed_to_create_question_pool'));
        }
    };

    return (
        <Box component="form" onSubmit={handleCreate} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label={t('question_pool_name')}
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label={t('description')}
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                {t('create_question_pool')}
            </Button>
        </Box>
    );
};

export default CreateQuestionPool;