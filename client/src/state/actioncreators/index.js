export const loginUser = (email, displayName, role, uid, avatar) =>{
    return (dispatch) => {
        dispatch({
            type : "LOGIN",
            payload: {email, displayName,  role, uid, avatar}
        })
    }
}

export const logoutUser = ( email, displayName, role, uid, avatar) =>{
    return (dispatch) => {
        dispatch({
            type : "LOGOUT",
            payload : { email, displayName, role, uid, avatar}
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

export const emailchecked = (emailchecker) =>{
    return (dispatch) => {
        dispatch({
            type : "EMAILCHECKED",
            payload : {emailchecker}
        })
    }
}

export const emailnotchecked = (emailchecker) =>{
    return (dispatch) => {
        dispatch({
            type : "EMAILNOTCHECKED",
            payload : {emailchecker}
        })
    }
}

export const prependprd = (prddata) =>{
    return (dispatch) => {
        dispatch({
            type : "PREPEND_PRD",
            payload : {prddata}
        })
    }
}

export const appendprd = (prddata) =>{
    return (dispatch) => {
        dispatch({
            type : "APPEND_PRD",
            payload : {prddata}
        })
    }
}