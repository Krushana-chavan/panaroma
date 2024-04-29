import { accessData, saveData } from "../cookies/cookies";
import * as types from "./actionTypes";
import { SIGNIN_FAILURE_REQUEST, SIGNIN_LOODING_REQUEST, SIGNIN_SUCCESS_REQUEST, SIGNOUT_REQUEST, SIGNUP_FAILURE_REQUEST, SIGNUP_LOODING_REQUEST, SIGNUP_SUCCESS_REQUEST } from "./actionTypes"

const initState = {
  data: [],
  error:"",
  formData: {},
  isLoading:true
};

export const reducer = (state = initState, action) => {

  const { type, payload } = action;

  switch (type) {
    case types.REQUEST_OF_DATA:{
      return{
        ...state,isLoading:true,error:false
      }
    }
    case types.REQUEST_OF_DATA_FULLFILLED:{
      return {
        ...state,isLoading:false,error:false
      }
    }
    case types.ADD_DATA: {
      return {
        ...state,
        formData: payload,isLoading:false,error:false
      };
    }
    case types.GET_ALL_DATA: {
      return {
        ...state,error:false,
        data: payload,isLoading:false
      };
    }
    case types.ADD_DATA_SUCCESS: {
      return {
        ...state,error:false,
        data: payload,isLoading:false
      };
    }
    

    case types.GET_ERROR:{
        return {
            ...state,error:payload,isLoading:false
        }
    }
   
  case SIGNUP_LOODING_REQUEST : return {
      ...state,isLoding: true
  }
  case SIGNUP_SUCCESS_REQUEST : return {
      ...state,isLoding: false, signup_status: true,msg:payload
  }
  case SIGNUP_FAILURE_REQUEST : return {
      ...state, isLoding: false, isError: true,isErrorData:payload,signup_status:false
  }
  case SIGNIN_LOODING_REQUEST : return {
      ...state,isLoding: true
  }
  case SIGNIN_SUCCESS_REQUEST :
  return {
      ...state,isLoding: false, token: payload.token, u_Data: payload.data,msg:payload.msg, isAuth: true 
  }
  case SIGNIN_FAILURE_REQUEST : return {
      ...state,isLoding: false, isError: true,isErrorData:payload
  }
  case SIGNOUT_REQUEST : return {
      ...state
  }
    default:
         return state 
  }
};
