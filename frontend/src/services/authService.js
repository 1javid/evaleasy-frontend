import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL;

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

export const createSubject = (data) => {
    return axios.post(API_URL + 'test/subjects/', data);
};

export const listSubjects = (createdBy) => {
    return axios.get(`${API_URL}test/subjects/list/?created_by=${createdBy}`);
};

export const getSubjectById = (id) => {
    return axios.get(`${API_URL}test/subjects/${id}/`);
};

export const createQuestionPool = (data) => {
    return axios.post(API_URL + 'test/question-pools/', data);
};

export const listQuestionPoolsBySubject = (subjectId) => {
    return axios.get(`${API_URL}test/question-pools/subject/${subjectId}/`);
};

export const createQuestion = (data) => {
    return axios.post(API_URL + 'test/questions/', data);
};

export const listQuestionsByQuestionPool = (questionPoolId) => {
    return axios.get(`${API_URL}test/questions/question-pool/${questionPoolId}/`);
};

export const createTest = (data) => {
    return axios.post(API_URL + 'test/generate-test/', data);
};

export const listTestsBySubject = (subjectId) => {
    return axios.get(`${API_URL}test/tests/subject/${subjectId}/`);
};

export const getTestById = (testId) => {
    return axios.get(`${API_URL}test/tests/${testId}/`);
};

export const getTestQuestions = (testId) => {
    return axios.get(`${API_URL}test/tests/${testId}/questions/`);
};

export const submitAssessment = (formData) => {
    return axios.post(`${API_URL}assess/submit-assessment/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const getGroupIdsBySubjectId = (subjectId) => {
    return axios.get(`${API_URL}test/tests/subject/${subjectId}/group-ids/`);
};

export const getTestsByGroupId = (groupId) => {
    return axios.get(`${API_URL}test/tests/group/${groupId}/`);
};