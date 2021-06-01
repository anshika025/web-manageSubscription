import { combineReducers } from 'redux';
import getUserDetails from './UserDetails';

const rootReducer = combineReducers({
    getUserDetails,
});

export default rootReducer;
