export const loginUser = (loginData) =>{
    return (dispatch) => {
        dispatch({
            type : "LOGIN",
            payload: {loginData}
        })
    }
}
export const editInfo = (userinfo) =>{
    return (dispatch) => {
        dispatch({
            type : "EDITINFO",
            payload: {userinfo}
        })
    }
}

export const addchannel = (channel) =>{
    return (dispatch) => {
        dispatch({
            type : "ADDCHANNEL",
            payload: {channel}
        })
    }
}

export const logoutUser = ( uid, name, tags, age, sex, date, insta, mobile, avatar) =>{
    return (dispatch) => {
        dispatch({
            type : "LOGOUT",
            payload : { uid, name, tags, age, sex, date, insta, mobile, avatar}
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