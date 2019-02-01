import {
    INIT_CHATS_PROJECT,
    SUCCESS_CHATS_PROJECT,
    ERROR_CHATS_PROJECT,
    URL_CHATS_PROJECT,
} from './const'

import io from 'socket.io-client'

function getMessages(varState, projectID) {
    let promise = new Promise((resolve, reject) => {
        let userData = varState.login.data
        if (userData) {
            fetch(URL_CHATS_PROJECT + '/' + projectID, {
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
export function initGetMessagesForProject(projectID) {
    return (dispatch, getState) => {
        dispatch(initGetMessageProject())
        getMessages(getState(), projectID)
            .then(resp => dispatch(successGetMessageProject(resp)))
            .catch(error => dispatch(errorGetMessageProject()))
    }
}

function initGetMessageProject() {
    return { type: INIT_CHATS_PROJECT }
}

function successGetMessageProject(data) {
    return { type: SUCCESS_CHATS_PROJECT, data }
}

function errorGetMessageProject() {
    return { type: ERROR_CHATS_PROJECT }
}
