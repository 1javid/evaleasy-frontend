import React from 'react';
import { Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng); // Save selected language to local storage
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button onClick={() => changeLanguage('en')}>EN</Button>
            <Button onClick={() => changeLanguage('ru')}>RU</Button>
            <Button onClick={() => changeLanguage('az')}>AZ</Button>
        </Box>
    );
};

export default LanguageSwitcher;