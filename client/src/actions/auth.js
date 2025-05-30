import api from "../utils/axiosConfig";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// @load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await api.get('/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// @login user
export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post('/auth', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    dispatch(setAlert("User Logged in", "primary", 5000));
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger', 5000));
      });
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// @register user
export const register = ({ name, email, password }) => async dispatch => {
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await api.post('/users', body);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    dispatch(setAlert("User Registered", "primary", 5000));
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger', 5000));
      });
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// @logout user
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
