import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SubjectCard = ({ subject }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/subject/${subject.id}`);
    };

    return (
        <Card variant="outlined" sx={{ mb: 2, cursor: 'pointer' }} onClick={handleCardClick}>
            <CardContent>
                <Typography variant="h6">{subject.name}</Typography>
                {subject.description && (
                    <Typography variant="body2" color="textSecondary">
                        {subject.description}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default SubjectCard;