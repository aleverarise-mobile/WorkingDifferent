import { AsyncStorage } from "react-native"

import {
    INIT_LOGIN,
    SUCCESS_LOGIN,
    ERROR_LOGIN,
    URL_LOGIN,
    STORE_USER,
    STORE_USER_DATA,
    URL_USER_COMPANY,
    SUCCESS_GET_DATA_USER,
    CLEAR_USER
} from './const'

_storeData = async (user) => {
    try {
        await AsyncStorage.setItem('USER', JSON.stringify(user));
    } catch (error) {
    }
}

_storeDataUser = async (user) => {
    try {
        await AsyncStorage.setItem('DATA_USER', JSON.stringify(user));
    } catch (error) {
    }
}

/* INIT LOGIN */
export function initProcessLogin(email, password) {
    return dispatch => {
        dispatch(initLogin());
        fetch(URL_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(successLogin(responseJson));
                _storeData(responseJson)
                fetch(URL_USER_COMPANY + '/' + responseJson._id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': responseJson.token
                    },

                })
                    .then((resp) => resp.json())
                    .then((resp) => {
                        dispatch(successDataUser(resp));
                        _storeDataUser(resp)
                    })
                    .catch((error) => {
                        dispatch(errorLogin());
                    });
            })
            .catch((error) => {
                dispatch(errorLogin());
            });
    };
}

export function storeUser(data) {
    return { type: STORE_USER, data };
}

export function storeUserData(data) {
    return { type: STORE_USER_DATA, data };
}

export function clearUser() {
    return { type: CLEAR_USER };
}

function initLogin() {
    return { type: INIT_LOGIN };
}

function successLogin(data) {
    return { type: SUCCESS_LOGIN, data };
}

function successDataUser(data) {
    return { type: SUCCESS_GET_DATA_USER, data };
}

function errorLogin() {
    return { type: ERROR_LOGIN };
}