// filepath: /d:/React/evaleasy-frontend/frontend/src/components/Admin/InstitutionDetails.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import CreateRepresentative from './CreateRepresentative';
import { listRepresentativesByInstitution } from '../../services/authService';

const InstitutionDetails = () => {
    const { id } = useParams();
    const [representatives, setRepresentatives] = useState([]);

    // Fetch existing representatives when the component mounts
    useEffect(() => {
        const fetchRepresentatives = async () => {
            try {
                const response = await listRepresentativesByInstitution(id);
                setRepresentatives(response.data);
            } catch (err) {
                console.error('Failed to fetch representatives', err);
            }
        };

        fetchRepresentatives();
    }, [id]);

    // Callback when a new representative is created
    const handleRepresentativeCreated = (representative) => {
        setRepresentatives((prev) => [...prev, representative]);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4 }}>
                Institution Details
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
                Institution ID: {id}
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Create Representative</Typography>
                <CreateRepresentative institutionId={id} onRepresentativeCreated={handleRepresentativeCreated} />
            </Box>
            <Typography variant="h5" sx={{ mt: 4 }}>
                Representatives
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {representatives.map((rep) => (
                    <Grid item xs={12} sm={6} md={4} key={rep.user_id}>
                        <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
                            <Typography variant="h6">{rep.first_name} {rep.last_name}</Typography>
                            <Typography variant="body2">Email: {rep.email}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default InstitutionDetails;