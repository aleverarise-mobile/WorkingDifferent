import {
    INIT_CHATS_PROJECT,
    SUCCESS_CHATS_PROJECT,
    ERROR_CHATS_PROJECT,
    ADD_NEW_MESSAGE_FOR_PROJECT,
} from './const'

const initialState = {
    chat: {},
    messages: [],
    loading: false,
}

export default (chatReduces = (state = initialState, action) => {
    switch (action.type) {
        case INIT_CHATS_PROJECT:
            return Object.assign({}, state, {
                loading: true,
            })
        case SUCCESS_CHATS_PROJECT:
            return Object.assign({}, state, {
                chat: action.data,
                messages: action.data.messages,
                loading: false,
            })
        case ERROR_CHATS_PROJECT:
            return Object.assign({}, state, {
                chat: {},
                loading: false,
            })
        default:
            return state
    }
})
