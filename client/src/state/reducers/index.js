import { combineReducers } from "redux";
import authReducer from './authReducer'
import loggedinReducer from './loggedinReducer';
import emailReducer from './emailReducer';
import myPrdReducer from './myPrdReducer';
import advertiserReducer from './advertiserReducer';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["auth", "loggedin", "myprd", "advertiser"]
}

const reducers = combineReducers({
    auth: authReducer,
    loggedin: loggedinReducer,
    emailcheck: emailReducer,
    myprd: myPrdReducer,
    advertiser: advertiserReducer
})


export default persistReducer(persistConfig,reducers);