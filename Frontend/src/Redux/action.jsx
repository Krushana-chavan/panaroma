
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as types from "./actionTypes";
import {
  SIGNIN_FAILURE_REQUEST,
  SIGNIN_LOODING_REQUEST,
  SIGNIN_SUCCESS_REQUEST,
  SIGNUP_FAILURE_REQUEST,
  SIGNUP_LOODING_REQUEST,
  SIGNUP_SUCCESS_REQUEST,
} from "./actionTypes";

// export const loginAdmin=(payload)=>dispatch=>{



export const getAlldata = (name) => async (dispatch) => {
  dispatch({type:types.REQUEST_OF_DATA})
 await axios.get(
      `http://localhost:3001/v1/currency/getAllData`
    )
    .then((r) => {
   
      dispatch({type:types.GET_ALL_DATA,
      payload:r?.data?.data})
    })
    .catch((e) => {
      return dispatch({ type: types.GET_ERROR, payload: e });
    });
};



export const refreshPage = () => {
  window.location.reload();
};




export const get7daysWeather=(latitude,longitude)=>dispatch=>{
  dispatch({type:types.REQUEST_OF_DATA})
  let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=aeb2e8e67a323e70bae652830b434d64`
axios.get(url)
.then((r)=>{

  // console.log("7",r.data.daily)
 return dispatch({type:types.GET_WEATHER_FORECAST,payload:r.data.daily})
}).catch(e=>{
  return dispatch({ type: types.GET_ERROR, payload: e });
})
}

// import { storeData_LC } from "../../components/LocalStorage";

export const SignupReq =  (e) => async(dispatch) => {
  dispatch({ type: SIGNUP_LOODING_REQUEST });
  console.log(e)
  return await axios
    .post(`http://localhost:3001/v1/auth/register`, e)
    .then((response) => {
      console.log(response)
      if(response.status === 201){
        return dispatch({
          type: SIGNUP_SUCCESS_REQUEST,
          payload: "User Created Successfully!",
        });
      }else{
        dispatch({
          type: SIGNUP_FAILURE_REQUEST,
          payload: response.data.data,
        });
      }
     
    })
    .catch(function (error) {
      const { response } = error;
      return dispatch({
        type: SIGNUP_FAILURE_REQUEST,
        payload: response.data.data,
      });
    });
};

export const SigninReq = (e) => async (dispatch) => {
  dispatch({ type: SIGNIN_LOODING_REQUEST });
  return await axios
    .post(`http://localhost:3001/v1/auth/login`, e)
    .then(function (response) {
     
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("refreshtoken",response.data.refreshtoken)
     localStorage.setItem("user",JSON.stringify(response.data.user))
      return dispatch({
        type: SIGNIN_SUCCESS_REQUEST,
        payload: { token: response.data.token, data: response.data.user },
      });
    })
    .catch(function (error) {
      return dispatch({
        type: SIGNIN_FAILURE_REQUEST,
        payload: error.response.data.data,
      });
    });
};