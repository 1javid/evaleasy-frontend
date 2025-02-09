import React, { useState, useRef } from 'react';
import { Box, Button, Typography, Card, CardContent, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Webcam from 'react-webcam';

const AssessmentTab = () => {
    const [file, setFile] = useState(null);
    const [assessmentData, setAssessmentData] = useState(null);
    const [error, setError] = useState(null);
    const [openCamera, setOpenCamera] = useState(false);
    const webcamRef = useRef(null);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleUpload = async () => {
        if (!file) {
            setError('Please upload an answer sheet or take a photo.');
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
            setError('Failed to submit assessment.');
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
                        Question {questionId}: {userAnswer} {isCorrect ? '' : `(Correct: ${correctAnswer})`}
                    </Typography>
                </Grid>
            );
        });
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5">Submit Assessment</Typography>
            <Box {...getRootProps()} sx={{ border: '1px dashed #ccc', p: 2, mt: 2, cursor: 'pointer' }}>
                <input {...getInputProps()} />
                <Typography>Drag & drop an answer sheet here, or click to select a file</Typography>
            </Box>
            {file && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Uploaded file: {file.name}
                </Typography>
            )}
            <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2 }}>
                Upload Answer Sheet
            </Button>
            <Button variant="outlined" color="primary" onClick={handleTakePhoto} sx={{ mt: 2, ml: 2 }}>
                Use Camera
            </Button>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {assessmentData && (
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography variant="h6">Assessment Details</Typography>
                        <Typography>ID: {assessmentData.id}</Typography>
                        <Typography>Assessment ID: {assessmentData.assessment_id}</Typography>
                        <Typography>Student ID: {assessmentData.student_id}</Typography>
                        <Typography>First Name: {assessmentData.first_name}</Typography>
                        <Typography>Last Name: {assessmentData.last_name}</Typography>
                        <Typography>Variant: {assessmentData.variant}</Typography>
                        <Typography>Score: {assessmentData.score}</Typography>
                        <Typography>Created At: {new Date(assessmentData.created_at).toLocaleString()}</Typography>
                        <Typography>Updated At: {new Date(assessmentData.updated_at).toLocaleString()}</Typography>
                        <Typography>Answers:</Typography>
                        <Grid container spacing={1}>
                            {renderAnswers(assessmentData.answers, assessmentData.correct_answers)}
                        </Grid>
                        <Typography>Answer Sheet:</Typography>
                        {assessmentData.answer_sheet ? (
                            <img src={`data:image/png;base64,${assessmentData.answer_sheet}`} alt="Answer Sheet" style={{ width: '100%', marginTop: '10px' }} />
                        ) : (
                            <Typography color="error">No answer sheet available</Typography>
                        )}
                    </CardContent>
                </Card>
            )}
            <Dialog open={openCamera} onClose={() => setOpenCamera(false)}>
                <DialogTitle>Take Photo</DialogTitle>
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
                        Cancel
                    </Button>
                    <Button onClick={handleCapture} color="primary">
                        Capture
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AssessmentTab;