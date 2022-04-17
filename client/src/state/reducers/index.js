import { combineReducers } from "redux";
import authReducer from './authReducer'
import loggedinReducer from './loggedinReducer'

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["auth", "loggedin"]
}

const reducers = combineReducers({
    auth: authReducer,
    loggedin: loggedinReducer
})


export default persistReducer(persistConfig,reducers);