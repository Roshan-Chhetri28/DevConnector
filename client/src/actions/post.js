import api from "../utils/axiosConfig";
import { setAlert } from "./alert";
import {
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES
} from "./types";

// @ Get all posts
export const getPosts = () => async dispatch => {
    try {
        const res = await api.get('/post');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};

// @ Add like
export const addLike = (postId) => async dispatch => {
    try {
        const res = await api.put(`/post/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                postId,
                likes: res.data
            }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};

// @ Remove like
export const removeLike = (postId) => async dispatch => {
    try {
        const res = await api.put(`/post/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                postId,
                likes: res.data
            }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};

// @ Delete Post
export const deletePost = (postId) => async dispatch => {
    try {
        await api.delete(`/post/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: postId
        });
        dispatch(setAlert("Post Deleted", 'danger', 5000));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};

// @ Add Post
export const addPost = (formData) => async dispatch => {
    try {
        const res = await api.post(`/post`, formData);
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert("Post Added", 'success', 5000));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};

// @ Get single post
export const getPost = (id) => async dispatch => {
    try {
        const res = await api.get(`/post/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};
