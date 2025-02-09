import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { createSubject } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

const CreateSubject = ({ onSubjectCreated }) => {
    const { auth } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await createSubject({
                institution_id: auth.institution_id,
                name,
                description,
                created_by: auth.user_id
            });
            // Reset form on success
            setName('');
            setDescription('');
            setError(null);
            alert('Subject created successfully!');
            onSubjectCreated(response.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to create subject.');
        }
    };

    return (
        <Box component="form" onSubmit={handleCreate} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Subject Name"
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
                Create Subject
            </Button>
        </Box>
    );
};

export default CreateSubject;