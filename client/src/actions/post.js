import axios from "axios";
import { setAlert } from "./alert";
import { ADD_POST, DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";

// @ Get post
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/post')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })
    }
}

// @ Add like
export const addLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`http://localhost:5000/api/post/like/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                postId, likes: res.data
            }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })
    }
}

// @ remove like
export const removeLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`http://localhost:5000/api/post/unlike/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                postId, likes: res.data
            }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })
    }
}
// @ Delete Post
export const deletePost = (postId) => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/post/${postId}`)
        dispatch({
            type: DELETE_POST,
            payload: postId
        })
        dispatch(setAlert("Post Deleted", 'danger', '5000'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })
    }
}
// @ Add Post
export const addPost = (formData) => async dispatch => {
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    
    try {
        const res = await axios.post(`http://localhost:5000/api/post`, formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert("Post Added", 'success', '5000'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })
    }
}