import React, { useState, useContext, useEffect } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import { createTest, listQuestionPoolsBySubject } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateTest = ({ subjectId, onTestCreated }) => {
    const { auth } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [instructions, setInstructions] = useState('');
    const [variants, setVariants] = useState(['A']);
    const [questionSelections, setQuestionSelections] = useState([{ question_pool: '', positions: '' }]);
    const [questionPools, setQuestionPools] = useState([]);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchQuestionPools = async () => {
            try {
                const response = await listQuestionPoolsBySubject(subjectId);
                setQuestionPools(response.data);
            } catch (err) {
                setError(err.response?.data || t('failed_to_fetch_question_pools'));
            }
        };

        fetchQuestionPools();
    }, [subjectId, t]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await createTest({
                subject: subjectId,
                instructor_id: auth.user_id,
                name,
                notes,
                instructions,
                variants,
                question_selections: questionSelections.map(selection => ({
                    question_pool: selection.question_pool,
                    positions: selection.positions.split(',').map(Number)
                }))
            });
            // Reset form on success
            setName('');
            setNotes('');
            setInstructions('');
            setVariants(['A']);
            setQuestionSelections([{ question_pool: '', positions: '' }]);
            setError(null);
            alert(t('test_created_successfully'));
            onTestCreated(response.data); // Ensure the callback is called with the correct data
        } catch (err) {
            setError(err.response?.data || t('failed_to_create_test'));
        }
    };

    const handleQuestionSelectionChange = (index, field, value) => {
        const newSelections = [...questionSelections];
        newSelections[index][field] = value;
        setQuestionSelections(newSelections);
    };

    const addQuestionSelection = () => {
        setQuestionSelections([...questionSelections, { question_pool: '', positions: '' }]);
    };

    const addVariant = () => {
        setVariants([...variants, String.fromCharCode(65 + variants.length)]);
    };

    const removeVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    return (
        <Box component="form" onSubmit={handleCreate} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label={t('test_name')}
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label={t('notes')}
                fullWidth
                margin="normal"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <TextField
                label={t('instructions')}
                fullWidth
                margin="normal"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
            />
            <Typography variant="body2" sx={{ mt: 2 }}>
                {t('variants')}:
            </Typography>
            {variants.map((variant, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        {variant}
                    </Typography>
                    <IconButton onClick={() => removeVariant(index)} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <Button variant="outlined" color="primary" onClick={addVariant} sx={{ mt: 2 }}>
                {t('add_variant')}
            </Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
                {t('question_selections')}:
            </Typography>
            {questionSelections.map((selection, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>{t('question_pool')}</InputLabel>
                        <Select
                            value={selection.question_pool}
                            onChange={(e) => handleQuestionSelectionChange(index, 'question_pool', e.target.value)}
                            required
                        >
                            {questionPools.map((pool) => (
                                <MenuItem key={pool.id} value={pool.id}>
                                    {pool.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label={t('positions')}
                        fullWidth
                        margin="normal"
                        value={selection.positions}
                        onChange={(e) => handleQuestionSelectionChange(index, 'positions', e.target.value)}
                        required
                    />
                </Box>
            ))}
            <Button variant="outlined" color="primary" onClick={addQuestionSelection} sx={{ mt: 2 }}>
                {t('add_question_selection')}
            </Button>
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, ml: 2 }}>
                {t('create_test')}
            </Button>
        </Box>
    );
};

export default CreateTest;