import React, { useState, useRef } from 'react';
import { Box, Button, Typography, Card, CardContent, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useTranslation } from 'react-i18next';

const AssessmentTab = () => {
    const [file, setFile] = useState(null);
    const [assessmentData, setAssessmentData] = useState(null);
    const [error, setError] = useState(null);
    const [openCamera, setOpenCamera] = useState(false);
    const webcamRef = useRef(null);
    const { t } = useTranslation();

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleUpload = async () => {
        if (!file) {
            setError(t('please_upload_or_take_photo'));
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://127.0.0.1:4000/api/assess/submit-assessment/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setAssessmentData(response.data);
            setError(null);
        } catch (err) {
            setError(t('failed_to_submit_assessment'));
        }
    };

    const handleTakePhoto = () => {
        setOpenCamera(true);
    };

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const blob = dataURItoBlob(imageSrc);
        setFile(new File([blob], 'captured_image.png', { type: 'image/png' }));
        setOpenCamera(false);
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const renderAnswers = (answers, correctAnswers) => {
        return Object.keys(answers).map((questionId) => {
            const userAnswer = answers[questionId][0];
            const correctAnswer = correctAnswers[questionId];
            const isCorrect = userAnswer === correctAnswer;

            return (
                <Grid item xs={12} key={questionId}>
                    <Typography variant="body2" sx={{ color: isCorrect ? 'green' : 'red' }}>
                        {t('question')} {questionId}: {userAnswer} {isCorrect ? '' : `(${t('correct')}: ${correctAnswer})`}
                    </Typography>
                </Grid>
            );
        });
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">{t('submit_assessment')}</Typography>
            </Box>
            <Box {...getRootProps()} sx={{ border: '1px dashed #ccc', p: 2, mt: 2, cursor: 'pointer' }}>
                <input {...getInputProps()} />
                <Typography>{t('drag_drop_or_click')}</Typography>
            </Box>
            {file && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                    {t('uploaded_file')}: {file.name}
                </Typography>
            )}
            <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2 }}>
                {t('upload_answer_sheet')}
            </Button>
            <Button variant="outlined" color="primary" onClick={handleTakePhoto} sx={{ mt: 2, ml: 2 }}>
                {t('use_camera')}
            </Button>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {assessmentData && (
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography variant="h6">{t('assessment_details')}</Typography>
                        <Typography>ID: {assessmentData.id}</Typography>
                        <Typography>{t('assessment_id')}: {assessmentData.assessment_id}</Typography>
                        <Typography>{t('student_id')}: {assessmentData.student_id}</Typography>
                        <Typography>{t('first_name')}: {assessmentData.first_name}</Typography>
                        <Typography>{t('last_name')}: {assessmentData.last_name}</Typography>
                        <Typography>{t('variant')}: {assessmentData.variant}</Typography>
                        <Typography>{t('score')}: {assessmentData.score}</Typography>
                        <Typography>{t('created_at')}: {new Date(assessmentData.created_at).toLocaleString()}</Typography>
                        <Typography>{t('updated_at')}: {new Date(assessmentData.updated_at).toLocaleString()}</Typography>
                        <Typography>{t('answers')}:</Typography>
                        <Grid container spacing={1}>
                            {renderAnswers(assessmentData.answers, assessmentData.correct_answers)}
                        </Grid>
                        <Typography>{t('answer_sheet')}:</Typography>
                        {assessmentData.answer_sheet ? (
                            <img src={`data:image/png;base64,${assessmentData.answer_sheet}`} alt="Answer Sheet" style={{ width: '100%', marginTop: '10px' }} />
                        ) : (
                            <Typography color="error">{t('no_answer_sheet')}</Typography>
                        )}
                    </CardContent>
                </Card>
            )}
            <Dialog open={openCamera} onClose={() => setOpenCamera(false)}>
                <DialogTitle>{t('take_photo')}</DialogTitle>
                <DialogContent>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        width="100%"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCamera(false)} color="primary">
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleCapture} color="primary">
                        {t('capture')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AssessmentTab;