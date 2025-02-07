// filepath: /d:/React/evaleasy-frontend/frontend/src/components/Representative/RepresentativeDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import CreateInstructor from './CreateInstructor';
import { listInstructorsByInstitution } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

const RepresentativeDashboard = () => {
    const { auth } = useContext(AuthContext);
    const [instructors, setInstructors] = useState([]);

    // Fetch existing instructors when the component mounts
    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await listInstructorsByInstitution(auth.institution_id);
                setInstructors(response.data);
            } catch (err) {
                console.error('Failed to fetch instructors', err);
            }
        };

        fetchInstructors();
    }, [auth.institution_id]);

    // Callback when a new instructor is created
    const handleInstructorCreated = (instructor) => {
        setInstructors((prev) => [...prev, instructor]);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Representative Dashboard
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Create Instructor</Typography>
                <CreateInstructor institutionId={auth.institution_id} onInstructorCreated={handleInstructorCreated} />
            </Box>
            <Typography variant="h5" sx={{ mt: 4 }}>
                Instructors
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {instructors.map((inst) => (
                    <Grid item xs={12} sm={6} md={4} key={inst.id}>
                        <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
                            <Typography variant="h6">{inst.first_name} {inst.last_name}</Typography>
                            <Typography variant="body2">Email: {inst.email}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default RepresentativeDashboard;