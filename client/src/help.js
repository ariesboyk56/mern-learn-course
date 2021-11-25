/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import setAuthToken from "./utils/setAuthToken";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants/AuthConstants";



// Authenticate user
 export const loadUser = async ({ setStateAuth }) => {
  
  if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
    setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
  }
  try {
    const response = await axios.get(`${apiUrl}/auth`);
    if (response.data.success) {
      // dispatch(setAuth(response.data.user ));
      // console.log("set lai state: true");
      setStateAuth({ isAuthenticated: true, user: response.data.user });
    }
  } catch (error) {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    setAuthToken(null);
    setStateAuth({ isAuthenticated: false, user: null });
  }
};