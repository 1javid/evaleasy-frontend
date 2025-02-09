import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import CreateSubject from './CreateSubject';
import SubjectCard from './SubjectCard';
import { listSubjects } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

const InstructorDashboard = () => {
    const { auth } = useContext(AuthContext);
    const [subjects, setSubjects] = useState([]);

    // Fetch existing subjects when the component mounts
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await listSubjects(auth.user_id);
                setSubjects(response.data);
            } catch (err) {
                console.error('Failed to fetch subjects', err);
            }
        };

        fetchSubjects();
    }, [auth.user_id]);

    // Callback when a new subject is created
    const handleSubjectCreated = (subject) => {
        setSubjects((prev) => [...prev, subject]);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Instructor Dashboard
            </Typography>
            <CreateSubject onSubjectCreated={handleSubjectCreated} />
            <Typography variant="h5" sx={{ mt: 4 }}>
                Subjects
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {subjects.map((subject) => (
                    <Grid item xs={12} sm={6} md={4} key={subject.id}>
                        <SubjectCard subject={subject} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default InstructorDashboard;