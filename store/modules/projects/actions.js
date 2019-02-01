import {
    // PROJECTS
    INIT_PROJECTS,
    SUCCESS_PROJECTS,
    ERROR_PROJECTS,
    URL_PROJECT,
    // MILESTONES
    GET_MILESTONES,
    SUCCESS_MILESTONES,
    ERROR_MILESTONES,
    URL_PROJECT_MILESTONES,
    // PROJECT
    SELECTED_PROJECT
} from './const'

/* INIT GET PROJECTS */
export function initProcessGetProjectsMe() {
    return (dispatch, getState) => {
        dispatch(initProjectsMe());
        fetch(URL_PROJECT + '/' + getState().login.user._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getState().login.user.token
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(successProjectsMe(responseJson));
                dispatch(initProcessSetProjectSelected(responseJson[0], 0, 0));
                dispatch(initProcessGetProjectsMeMilestones())
            })
            .catch((error) => {
                dispatch(errorProjectsMe());
            });
    };
}

/* INIT GET PROJECTS MILESTONES */
export function initProcessGetProjectsMeMilestones() {
    return (dispatch, getState) => {
        dispatch(initProjectsMeMilestones());
        fetch(URL_PROJECT_MILESTONES + '/' + getState().projects.project.project._id + '/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getState().login.user.token
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(successProjectsMeMilestones(responseJson));
            })
            .catch((error) => {
                dispatch(errorProjectsMeMilestones());
            });
    };
}

export function initProcessSetProjectSelected(project, index, key) {
    return { type: SELECTED_PROJECT, data: { project, index, key } };
}

// PROJECTS
function initProjectsMe() {
    return { type: INIT_PROJECTS };
}

function successProjectsMe(data) {
    return { type: SUCCESS_PROJECTS, data };
}

function errorProjectsMe() {
    return { type: ERROR_PROJECTS };
}

// MILESTONES
function initProjectsMeMilestones() {
    return { type: GET_MILESTONES };
}

function successProjectsMeMilestones(data) {
    return { type: SUCCESS_MILESTONES, data };
}

function errorProjectsMeMilestones() {
    return { type: ERROR_MILESTONES };
}