
const initialState = {
    auth : {
        age: "",
        avatar: "",
        displayName: "",
        email: "",
        insta: "",
        joinedChannel: [],
        mobile: "",
        role: "" ,
        sex: "",
        tags: "",
        uid: ""
    } 
    
}

const reducer = ( state = initialState, action) => {
    switch(action.type) {
        case "LOGIN":
            return { ...state,
                state : action.payload
            }
        case "EDITINFO" :
            return {
                ...state,
                auth :  action.payload
            }
        case "ADDROOM" :
            return {
                ...state,
                state : action.payload
            }
        case "LOGOUT":
            return state = '';
        default:
            return state
    }
};

export default reducer;