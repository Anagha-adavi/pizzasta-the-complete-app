const initialState={
    loading:false,
    user_token:null,
    user_id:null,
    user_role:null,
    error:null
}

const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case "AUTH_START":{
            return {
                ...state,
                loading:true
            }
        }
        case "AUTH_SUCCESS":{
            return {
                ...state,
                loading:false,
                user_token:action.user_token,
                user_id:action.user_id,
                user_role:action.user_role
            }
        }

        case "AUTH_FAIL":{
            return {
                ...state,
                loading:false,
                error:action.error
            }
        }

        case "AUTH_LOGOUT":{
            return {
                ...state,
                user_token:null,
                user_id:null,
                user_role:null


            }
        }

        default:return state; 
    }
}
export default authReducer;