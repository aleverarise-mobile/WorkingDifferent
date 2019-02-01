import {
	INIT_LOGIN,
	SUCCESS_LOGIN,
	ERROR_LOGIN,
	STORE_USER,
	STORE_USER_DATA,
	SUCCESS_GET_DATA_USER,
	CLEAR_USER
} from './const'

const initialState = {
	user: {},
	data: {},
	loading: false,
	auth: false,
	message: '',
	error: false
};

export default (authReducer = (state = initialState, action) => {
	switch (action.type) {
		case INIT_LOGIN:
			return Object.assign({}, state, {
				loading: true
			});
		case SUCCESS_LOGIN:
			return Object.assign({}, state, {
				user: action.data,
			});
		case STORE_USER:
			return Object.assign({}, state, {
				user: action.data,
			});
		case SUCCESS_GET_DATA_USER:
			return Object.assign({}, state, {
				data: action.data,
				loading: false,
				auth: true,
				error: false,
				message: ''
			});
		case STORE_USER_DATA:
			return Object.assign({}, state, {
				data: action.data,
				loading: false,
				auth: true,
				error: false,
				message: ''
			});
		case CLEAR_USER:
			return Object.assign({}, state, {
				user: {},
				data: {},
				loading: false,
				auth: false,
				error: false,
				message: ''
			});
		case ERROR_LOGIN:
			return Object.assign({}, state, {
				user: {},
				loading: false,
				error: true,
				message: 'Error with the data provided'
			});
		default:
			return state;
	}
});