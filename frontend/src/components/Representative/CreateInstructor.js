// filepath: /d:/React/evaleasy-frontend/frontend/src/components/Representative/CreateInstructor.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { createInstructor } from '../../services/authService';

const CreateInstructor = ({ institutionId, onInstructorCreated }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await createInstructor({ institution: institutionId, first_name, last_name, email, password });
            // Reset form on success
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setError(null);
            alert('Instructor created successfully!');
            onInstructorCreated(response.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to create instructor.');
        }
    };

    return (
        <Box component="form" onSubmit={handleCreate} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="First Name"
                fullWidth
                margin="normal"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Create Instructor
            </Button>
        </Box>
    );
};

export default CreateInstructor;