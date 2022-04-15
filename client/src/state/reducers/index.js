import { combineReducers } from "redux";
import authReducer from './authReducer'
import loggedinReducer from './loggedinReducer'

const reducers = combineReducers({
    auth: authReducer,
    loggedin: loggedinReducer
})


export default reducers;