import axios from "axios"
import {SET_AUTH} from "../constants/ActionTypes"
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../constants/AuthConstants"

const initialState = {
  authLoading: true,
  isAuthenticated: false,
  user: null
}
//Register trên database
export const registerUser = async userForm => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, userForm)
    if(response.data.success)
    //Lưu accessToken trên localStorage
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
      
    // initialState = { isAuthenticated: true, user: response.data.user }
    
    return response.data
  } catch (error) {
    if(error.response.data) return error.response.data
    else return {success: false, message: error.message}
  }
}
//Login trên database
export const loginUser = async userForm => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, userForm)
    if(response.data.success)
    //Lưu accessToken trên localStorage
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
      
    // initialState = { isAuthenticated: true, user: response.data.user }
    
    return response.data
  } catch (error) {
    if(error.response.data) return error.response.data
    else return {success: false, message: error.message}
  }
}

const auth = (state=initialState, action) => {
  // let newState
  switch (action.type) {
    case SET_AUTH:
      // console.log("prev state",state);
      return {...state,
        authLoading: false,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
      }
      // console.log("set lai state",newState);
      // return {...newState}
    default:
      return state
  }
}
export default auth
// export default {}