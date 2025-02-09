import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TestCard = ({ testGroup }) => {
    const navigate = useNavigate();

    const handleCardClick = (assessmentId) => {
        navigate(`/test/${assessmentId}`);
    };

    const handleDownloadClick = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:4000/api/test/tests/group/${testGroup.group_id}/download-link/`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'tests.zip');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error('Failed to download tests:', err);
        }
    };

    // Sort variants and test IDs in alphabetical order
    const sortedVariants = testGroup.variants.map((variant, index) => ({
        variant,
        assessmentId: testGroup.test_ids[index]
    })).sort((a, b) => a.variant.localeCompare(b.variant));

    return (
        <Card variant="outlined" sx={{ mb: 2, cursor: 'pointer' }}>
            <CardContent>
                <Typography variant="h6">{testGroup.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    Variants: {sortedVariants.map(v => v.variant).join(', ')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Group ID: {testGroup.group_id}
                </Typography>
                <Typography variant="body2" color="textSecondary" onClick={handleDownloadClick} sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    Download Test Variants
                </Typography>
                {sortedVariants.map(({ variant, assessmentId }) => (
                    <Typography
                        key={assessmentId}
                        variant="body2"
                        color="primary"
                        onClick={() => handleCardClick(assessmentId)}
                        sx={{ cursor: 'pointer', mt: 1, textDecoration: 'underline' }}
                    >
                        View Variant {variant}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
};

export default TestCard;