import axios from "axios";
import { setAlert } from "./alert";
import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE } from "./types";

// * Get Current users profile 

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')


        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err }
        })
    }
}


// @ Get Current users profile
export const getProfileById = (user_id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/user/${user_id}`)


        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err }
        })
    }
}

// @ Get GitHub repos
export const getGithubRepos = (username) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/github/${username}`)

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err }
        })
    }
}

// @ Get all Profiles
export const getProfiles = () => async dispatch => {

    dispatch({ type: CLEAR_PROFILE })

    try {
        const res = await axios.get('http://localhost:5000/api/profile/')


        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err }
        })
    }
}


// Create or update profile

export const createProfile = (formData, navigate, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        let body = JSON.stringify(formData)
        const res = await axios.post('http://localhost:5000/api/profile/', body, config)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created', 'primary', 5000))

        if (!edit) {
            navigate('/dashboard') //* redirecting using Navigation doesnot work on action so we pass history object and use .push method to redirect
        }
    } catch (err) {
        const errors = err.response?.data?.errors;
        // console.log(err.response.data)
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger', 5000))
            })
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.message, status: err }
            })

        }
    }
}

// @Add Experience

export const addExperience = (formData, navigate) => async dispatch => {

    try {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        let body = JSON.stringify(formData)
        const res = await axios.put(' http://localhost:5000/api/profile/experience', body, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data // * profile
        })
        dispatch(setAlert('Experience Added', 'primary', 5000))


        navigate('/dashboard') //* redirecting using Navigation doesnot work on action so we pass history object and use .push method to redirect

    } catch (err) {
        const errors = err.response?.data?.errors;
        // console.log(errors)
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger', 5000))
            })
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.message, status: err }
            })

        }
    }

}
// @Add Education

export const addEducation = (formData, navigate) => async dispatch => {

    try {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        let body = JSON.stringify(formData)
        const res = await axios.put('http://localhost:5000/api/profile/education', body, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data // * profile
        })
        dispatch(setAlert('Education Added', 'primary', 5000))


        navigate('/dashboard') //* redirecting using Navigation doesnot work on action so we pass history object and use .push method to redirect

    } catch (err) {
        const errors = err.response?.data?.errors;
        // console.log(err.response.data)
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger', 5000))
            })
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.message, status: err }
            })

        }
    }

}

// @Delete Experience

export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Removed', 'success', 5000))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err }
        })
    }
}

// @Delete Education
export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Removed', 'success', 5000));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.message, status: err }
        });
    }
};

// @ Delete account and Profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure This can not be un done')) {
        try {
            await axios.delete(`http://localhost:5000/api/profile`)

            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })
            dispatch(setAlert('Your account has been permenantly deleted', 5000))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.message, status: err }
            })
        }
    }

}



