import { combineReducers } from 'redux';
import loginReducer from './auth/login/reducers';
import projectsReducer from './projects/reducers';
import chatReducer from './chat/reducers';
import chatProjectReducer from './chat/detail/project/reducers';
import chatUserReducer from './chat/detail/user/reducers';

export default combineReducers({
    login: loginReducer,
    projects: projectsReducer,
    chat: chatReducer,
    chatProject: chatProjectReducer,
    chatUser: chatUserReducer
});
