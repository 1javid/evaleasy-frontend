import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { createQuestionPool } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

const CreateQuestionPool = ({ subjectId, onQuestionPoolCreated }) => {
    const { auth } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

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
            alert('Question Pool created successfully!');
            onQuestionPoolCreated(response.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to create question pool.');
        }
    };

    return (
        <Box component="form" onSubmit={handleCreate} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Question Pool Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Description"
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Create Question Pool
            </Button>
        </Box>
    );
};

export default CreateQuestionPool;