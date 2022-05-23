
const initialState = {
    auth : {
        email : '',
        displayName : '',
        role : 'notsure',
        uid : '',
        avatar : ''
    } 
    
}

const reducer = ( state = initialState, action) => {
    switch(action.type) {
        case "LOGIN":
            return { ...state,
                state : action.payload
            }
        case "LOGOUT":
            return state = '';
        default:
            return state
    }
};

export default reducer;