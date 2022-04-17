export const loginUser = (email, displayName, role, uid) =>{
    return (dispatch) => {
        dispatch({
            type : "LOGIN",
            payload: {email, displayName,  role, uid}
        })
    }
}

export const logoutUser = ( email, displayName, role, uid) =>{
    return (dispatch) => {
        dispatch({
            type : "LOGOUT",
            payload : { email, displayName, role, uid}
        })
    }
}

export const fbuser = () =>{
    return (dispatch) => {
        dispatch({
            type : "LOGINTRUE",
            payload : true
        })
    }
}

export const nofbuser = (checker) =>{
    return (dispatch) => {
        dispatch({
            type : "LOGINFALSE",
            payload : {checker}
        })
    }
}