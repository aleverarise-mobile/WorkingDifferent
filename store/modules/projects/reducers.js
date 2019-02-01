import {
    // PROJECTS
    INIT_PROJECTS,
    SUCCESS_PROJECTS,
    ERROR_PROJECTS,
    SELECTED_PROJECT,
    // MILESTONES
    GET_MILESTONES,
    SUCCESS_MILESTONES,
    ERROR_MILESTONES,
} from './const'

const initialState = {
    projects: [],
    project: {},
    milestones: [],
    loading: false,
    loadingMilestone: false
};

export default (projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        // PROJECTS
        case INIT_PROJECTS:
            return Object.assign({}, state, {
                loading: true
            });
        case SUCCESS_PROJECTS:
            return Object.assign({}, state, {
                projects: action.data,
                loading: false
            });
        case SELECTED_PROJECT:
            return Object.assign({}, state, {
                project: {
                    project: action.data.project,
                    index: action.data.index,
                    key: action.data.key
                },
            });
        case ERROR_PROJECTS:
            return Object.assign({}, state, {
                projects: [],
                loading: false
            });

        // MILESTONES
        case GET_MILESTONES:
            return Object.assign({}, state, {
                loadingMilestone: true
            });
        case SUCCESS_MILESTONES:
            return Object.assign({}, state, {
                milestones: action.data,
                loadingMilestone: false
            });
        case ERROR_MILESTONES:
            return Object.assign({}, state, {
                milestones: [],
                loadingMilestone: false
            });
        default:
            return state;
    }
});