// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'; // Adjust if needed

export const loginUser = (credentials) => {
    return axios.post(API_URL + 'auth/login/', credentials);
};

export const createInstitution = (institutionData) => {
    return axios.post(API_URL + 'auth/create/institution/', institutionData);
};

export const listInstitutions = () => {
    return axios.get(API_URL + 'auth/institutions/');
};

export const createRepresentative = (representativeData) => {
    return axios.post(API_URL + 'auth/create/representative/', representativeData);
};

export const listRepresentativesByInstitution = (institutionId) => {
    return axios.get(`${API_URL}auth/users/representatives/?institution_id=${institutionId}`);
};

export const createInstructor = (instructorData) => {
    return axios.post(API_URL + 'auth/create/instructor/', instructorData);
};

export const listInstructorsByInstitution = (institutionId) => {
    return axios.get(`${API_URL}auth/users/instructors/?institution_id=${institutionId}`);
};

export const listSubjects = () => {
    return axios.get(API_URL + 'test/subjects/list/');
};

export const createSubject = (data) => {
    return axios.post(API_URL + 'test/subjects/', data);
};