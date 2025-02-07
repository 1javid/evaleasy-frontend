// src/components/Admin/CreateInstitution.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { createInstitution } from '../../services/authService';

const CreateInstitution = ({ onInstitutionCreated }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await createInstitution({ name });
            onInstitutionCreated(response.data);
            setName('');
            setError(null);
        } catch (err) {
            setError(err.response?.data || 'Failed to create institution.');
        }
    };

    return (
        <Box component="form" onSubmit={handleCreate} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h6">Create Institution</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Institution Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Button variant="contained" color="primary" type="submit">
                Create
            </Button>
        </Box>
    );
};

export default CreateInstitution;
