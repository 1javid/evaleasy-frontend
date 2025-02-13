import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { createInstitution } from '../../services/authService';
import { useTranslation } from 'react-i18next';

const CreateInstitution = ({ onInstitutionCreated }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await createInstitution({ name });
            onInstitutionCreated(response.data);
            setName('');
            setError(null);
        } catch (err) {
            setError(t('failed_to_create_institution'));
        }
    };

    return (
        <Box component="form" onSubmit={handleCreate} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h6">{t('create_institution')}</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label={t('institution_name')}
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Button variant="contained" color="primary" type="submit">
                {t('create')}
            </Button>
        </Box>
    );
};

export default CreateInstitution;