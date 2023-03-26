import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { editProfile, login as userLogin, register } from '../api';
import jwt from 'jwt-decode';
import { setItemLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemLocalStorage, getItemLocalStorage } from '../utils';

// create new components;
export const useAuth = () => {
    return useContext(AuthContext);
}


export const useProviderAuth = () => {
  const [user, setuser] = useState(null);   
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = getItemLocalStorage(LOCALSTORAGE_TOKEN_KEY);

    console.log(userToken);

    if(userToken){
      const user = jwt(userToken);
      console.log(user);
      setuser(user);
    }

    setLoading(false);

  }, []);

  const login = async(email, password) => {
    const response = await userLogin(email, password);
    // checking the response and handling each authentication
    if(response.success){
        // if the response is success we setup the user using particular hook
        setuser(response.data.user);
        setItemLocalStorage(
          LOCALSTORAGE_TOKEN_KEY,
          response.data.token ? response.data.token : null
          );
        return {
            success: true,
        };
    }
    else{
        return{
            success: false,
            message: response.message,
        };
    }

  };


  //creating SignUp/register function
  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if(response.success) {
        return {
          success: true,
      };
    } 
    else{
        return{
            success: false,
            message: response.message,
        };
    }

  }

  const updateUser = async(userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);
    // checking the response and handling each authentication
    if(response.success){
        // if the response is success we setup the user using particular hook
        setuser(response.data.user);
        setItemLocalStorage(
          LOCALSTORAGE_TOKEN_KEY,
          response.data.token ? response.data.token : null
          );
        return {
            success: true,
        };
    }
    else{
        return{
            success: false,
            message: response.message,
        };
    }
  }


  const logout = () => {
    setuser(null);
    removeItemLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  return {
    user,
    login, 
    logout, 
    loading,
    signup,
    updateUser
  }

};