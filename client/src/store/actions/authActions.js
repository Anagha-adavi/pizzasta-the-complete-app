import axios from '../../axios';

export const authStart=()=>{
    return {
        type:"AUTH_START"
    }
}

export const authSuccess=(user_id,user_token,user_role)=>{
    return {
        type:"AUTH_SUCCESS",
        user_id,
        user_token,
        user_role

    }
}


export const authLogout=()=>{
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');

    return {
        type:"AUTH_LOGOUT"
    }
}


export const authFail=(error_msg)=>{
    
    return {
        type:"AUTH_FAIL",
        error:error_msg

    }
}
export const authInit=(credentials,type)=>{

    return async(dispatch)=>{
        dispatch(authStart());
       
        if(type==="login"){
            try{
            const result= await axios.post('/api/v1/users/login',credentials);
            localStorage.setItem("user_token",result.data.token)
            localStorage.setItem("user_id",result.data.user._id)
            localStorage.setItem("user_role",result.data.user.role)
            dispatch(authSuccess(result.data.user._id,result.data.token,result.data.user.role));
            
        }
        catch(err){
            alert(err)
            dispatch(authFail(err))
        } 
    }
     
        }
    }
