import {
    INIT_CHATS,
    SUCCESS_CHATS,
    ERROR_CHATS,
    URL_CHATS,
    URL_FOR_PROJECT,
    CHANGE_PROJECTS,
    CLEAR_CHATS,
} from './const'

function getUsers(varState) {
    let promise = new Promise((resolve, reject) => {
        let userData = varState.login.data
        if (userData) {
            fetch(URL_CHATS + '/' + userData.company._id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: varState.login.user.token,
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    fetch(
                        URL_FOR_PROJECT +
                            '/' +
                            varState.projects.project.project._id,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: varState.login.user.token,
                            },
                        }
                    )
                        .then(resp => resp.json())
                        .then(respJson => {
                            resolve({
                                chatUsers: responseJson,
                                chatProject: respJson,
                            })
                        })
                })
        }
    })
    return promise
}

function getProjectChat(varState) {
    let promise = new Promise((resolve, reject) => {
        let userData = varState.login.data
        if (userData) {
            fetch(
                URL_FOR_PROJECT + '/' + varState.projects.project.project._id,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: varState.login.user.token,
                    },
                }
            )
                .then(resp => resp.json())
                .then(respJson => {
                    console.log(respJson)
                    resolve({ chatProject: respJson })
                })
        }
    })
    return promise
}

/* INIT CHAT */
export function initProcessGetUsersChatProjects() {
    return (dispatch, getState) => {
        dispatch(initGetUserForChatProjects())
        getUsers(getState())
            .then(resp => dispatch(successGetUserForChatProjects(resp)))
            .catch(error => dispatch(errorGetUserForChatProjects()))
    }
}

export function initChangeProjectGetChat() {
    return (dispatch, getState) => {
        getProjectChat(getState())
            .then(resp => dispatch(changeProject(resp)))
            .catch(error => dispatch(errorGetUserForChatProjects()))
    }
}

export function initProcessClearUsersChat() {
    return { type: CLEAR_CHATS }
}

function initGetUserForChatProjects() {
    return { type: INIT_CHATS }
}

function changeProject(data) {
    return { type: CHANGE_PROJECTS, data }
}

function successGetUserForChatProjects(data) {
    return { type: SUCCESS_CHATS, data }
}

function errorGetUserForChatProjects() {
    return { type: ERROR_CHATS }
}
