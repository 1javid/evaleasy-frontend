import React, { useState } from 'react';
import { Button, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng); // Save selected language to local storage
        handleClose();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            {isSmallScreen ? (
                <>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => changeLanguage('en')}>EN</MenuItem>
                        <MenuItem onClick={() => changeLanguage('ru')}>RU</MenuItem>
                        <MenuItem onClick={() => changeLanguage('az')}>AZ</MenuItem>
                    </Menu>
                </>
            ) : (
                <>
                    <Button
                        onClick={() => changeLanguage('en')}
                        sx={{ borderRadius: '12px', border: '1px solid #ccc', mx: 1 }}
                    >
                        EN
                    </Button>
                    <Button
                        onClick={() => changeLanguage('ru')}
                        sx={{ borderRadius: '12px', border: '1px solid #ccc', mx: 1 }}
                    >
                        RU
                    </Button>
                    <Button
                        onClick={() => changeLanguage('az')}
                        sx={{ borderRadius: '12px', border: '1px solid #ccc', mx: 1 }}
                    >
                        AZ
                    </Button>
                </>
            )}
        </Box>
    );
};

export default LanguageSwitcher;