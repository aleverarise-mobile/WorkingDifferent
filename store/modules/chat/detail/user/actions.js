import {
    INIT_CHATS_USER,
    SUCCESS_CHATS_USER,
    ERROR_CHATS_USER,
    URL_CHATS_USER,
} from './const'

function getMessages(varState, userID) {
    let promise = new Promise((resolve, reject) => {
        let userData = varState.login.data
        if (userData) {
            fetch(URL_CHATS_USER + '/' + userID, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: varState.login.user.token,
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    resolve(responseJson)
                })
        }
    })
    return promise
}

/* INIT CHAT */
export function initGetMessagesForUser(userID) {
    return (dispatch, getState) => {
        dispatch(initGetMessageUser())
        getMessages(getState(), userID)
            .then(resp => dispatch(successGetMessageUser(resp)))
            .catch(error => dispatch(errorGetMessageUser()))
    }
}

function initGetMessageUser() {
    return { type: INIT_CHATS_USER }
}

function successGetMessageUser(data) {
    return { type: SUCCESS_CHATS_USER, data }
}

function errorGetMessageUser() {
    return { type: ERROR_CHATS_USER }
}
