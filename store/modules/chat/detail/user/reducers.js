import {
    INIT_CHATS_USER,
    SUCCESS_CHATS_USER,
    ERROR_CHATS_USER,
} from './const'

const initialState = {
    chatData: {},
    loading: false
};

export default (chatReduces = (state = initialState, action) => {
    switch (action.type) {
        case INIT_CHATS_USER:
            return Object.assign({}, state, {
                loading: true
            });
        case SUCCESS_CHATS_USER:
            return Object.assign({}, state, {
                chatData: action.data,
                loading: false
            });
        case ERROR_CHATS_USER:
            return Object.assign({}, state, {
                chatData: [],
                loading: false
            });
        default:
            return state;
    }
});