import {
    INIT_CHATS,
    SUCCESS_CHATS,
    ERROR_CHATS,
    CLEAR_CHATS,
    CHANGE_PROJECTS,
} from './const'

const initialState = {
    chatUsers: [],
    chatProject: {},
    loading: false,
}

export default (chatReduces = (state = initialState, action) => {
    switch (action.type) {
        case INIT_CHATS:
            return Object.assign({}, state, {
                loading: true,
            })
        case SUCCESS_CHATS:
            return Object.assign({}, state, {
                chatUsers: action.data.chatUsers,
                chatProject: action.data.chatProject,
                loading: false,
            })
        case CHANGE_PROJECTS:
            return Object.assign({}, state, {
                chatProject: action.data.chatProject,
                loading: false,
            })
        case ERROR_CHATS:
            return Object.assign({}, state, {
                chatUsers: [],
                chatProject: {},
                loading: false,
            })
        case CLEAR_CHATS:
            return Object.assign({}, state, {
                chatUsers: [],
                chatProject: {},
                loading: false,
            })
        default:
            return state
    }
})
