
import { authAxios } from '../../utils/api';

import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    localStorage.setItem('token', token);
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};


export const auth = (username, password) => {

    return dispatch => {
        dispatch(authStart());
        authAxios.post(`/access_token`, null, {
            params: {
                'grant_type': 'password',
                'username': username,
                'password': password
            },
            auth: {
                username: 'sG7WikFP8UbFlQ',
                password: '9NwUSuG3IZf-pJKoQ-vp8oWAZqs'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(function (response) {
                if (response && response.data && response.data.error) {
                    dispatch(authFail(response.data.error));
                } else {
                    const { access_token, expires_in } = response.data;
                    // console.log(access_token);
                    // console.log(expires_in);
                    // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
                    dispatch(authSuccess(access_token));
                    dispatch(checkAuthTimeout(expires_in));
                    // localStorage.setItem('userId', response.data.localId);
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error && error.data) {

                    dispatch(authFail(error.data.message));
                }
            });
    };
};