// filepath: /d:/React/evaleasy-frontend/frontend/src/components/Admin/InstitutionCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InstitutionCard = ({ institution }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/institution/${institution.id}`);
    };

    return (
        <Card variant="outlined" onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
            <CardContent>
                <Typography variant="h6">{institution.name}</Typography>
                <Typography variant="body2">ID: {institution.id}</Typography>
            </CardContent>
        </Card>
    );
};

export default InstitutionCard;