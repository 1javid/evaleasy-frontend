// filepath: /d:/React/evaleasy-frontend/frontend/src/components/Admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import CreateInstitution from './CreateInstitution';
import InstitutionCard from './InstitutionCard';
import { listInstitutions } from '../../services/authService';

const AdminDashboard = () => {
    const [institutions, setInstitutions] = useState([]);

    // Fetch existing institutions when the component mounts
    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                const response = await listInstitutions();
                setInstitutions(response.data);
            } catch (err) {
                console.error('Failed to fetch institutions', err);
            }
        };

        fetchInstitutions();
    }, []);

    // Callback when a new institution is created
    const handleInstitutionCreated = (institution) => {
        setInstitutions((prev) => [...prev, institution]);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Admin Dashboard
            </Typography>
            <CreateInstitution onInstitutionCreated={handleInstitutionCreated} />
            <Typography variant="h5" sx={{ mt: 4 }}>
                Institutions
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {institutions.map((inst) => (
                    <Grid item xs={12} sm={6} md={4} key={inst.id}>
                        <InstitutionCard institution={inst} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AdminDashboard;