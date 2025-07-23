import api from "../utils/axiosConfig";
import { setAlert } from "./alert";
import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from "./types";

// * Get Current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err.response?.status }
        });
    }
};

// @ Get profile by user ID
export const getProfileById = (user_id) => async dispatch => {
    try {
        const res = await api.get(`/profile/user/${user_id}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err.response?.status }
        });
    }
};

// @ Get GitHub repos
export const getGithubRepos = (username) => async dispatch => {
    try {
        const res = await api.get(`/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err.response?.status }
        });
    }
};

// @ Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await api.get('/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err.response?.status }
        });
    }
};

// @ Create or Update Profile
export const createProfile = (formData, navigate, edit = false) => async dispatch => {
    try {
        const res = await api.post('/profile', formData);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'primary', 5000));
        if (!edit) navigate('/dashboard');
    } catch (err) {
        const errors = err.response?.data?.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err.response?.status }
        });
    }
};

// @ Add Experience
export const addExperience = (formData, navigate) => async dispatch => {
    try {
        const res = await api.put('/profile/experience', formData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience Added', 'primary', 5000));
        navigate('/dashboard');
    } catch (err) {
        const errors = err.response?.data?.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err.response?.status }
        });
    }
};

// @ Add Education
export const addEducation = (formData, navigate) => async dispatch => {
    try {
        const res = await api.put('/profile/education', formData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Added', 'primary', 5000));
        navigate('/dashboard');
    } catch (err) {
        const errors = err.response?.data?.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err.response?.status }
        });
    }
};

// @ Delete Experience
export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await api.delete(`/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience Removed', 'success', 5000));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err.response?.status }
        });
    }
};

// @ Delete Education
export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await api.delete(`/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Removed', 'success', 5000));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err.response?.status }
        });
    }
};

// @ Delete account & profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This cannot be undone.')) {
        try {
            await api.delete('/profile');
            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });
            dispatch(setAlert('Your account has been permanently deleted', 'danger', 5000));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.message, status: err.response?.status }
            });
        }
    }
};
