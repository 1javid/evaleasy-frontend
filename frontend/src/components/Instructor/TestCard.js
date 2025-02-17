import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const TestCard = ({ testGroup }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleCardClick = (assessmentId) => {
        navigate(`/test/${assessmentId}`);
    };

    const handleDownloadClick = async () => {
        try {
            const response = await axios.get(`https://gateway.smarteval.tech/api/test/tests/group/${testGroup.group_id}/download-link/`, {
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
            console.error(t('failed_to_download_tests'), err);
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
                    {t('variants')}: {sortedVariants.map(v => v.variant).join(', ')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {t('group_id')}: {testGroup.group_id}
                </Typography>
                <Typography variant="body2" color="textSecondary" onClick={handleDownloadClick} sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    {t('download_test_variants')}
                </Typography>
                {sortedVariants.map(({ variant, assessmentId }) => (
                    <Typography
                        key={assessmentId}
                        variant="body2"
                        color="primary"
                        onClick={() => handleCardClick(assessmentId)}
                        sx={{ cursor: 'pointer', mt: 1, textDecoration: 'underline' }}
                    >
                        {t('view_variant')} {variant}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
};

export default TestCard;