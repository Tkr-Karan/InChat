import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { editProfile, login as userLogin, register, fetchUserFriends, getPosts } from '../api';
import jwt from 'jwt-decode';
import { setItemLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemLocalStorage, getItemLocalStorage } from '../utils';
import { PostsContext } from '../providers/PostProvider';

// create new components;
export const useAuth = () => {
    return useContext(AuthContext);
}




export const  useProviderAuth = () => {
  const [user, setUser] = useState(null);   
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      // console.log(userToken);
  
      if(userToken){
        const user = jwt(userToken);
        const response = await fetchUserFriends();

        // console.log("response -->", response); 


        let friends = [];
        if(response.success){
          friends = response.data.friends;
          // console.log(friends);
        }

        setUser({
          ...user, 
          friends,
        })

  
        // console.log(user);
        // setUser(user);
      }
    }

    

    setLoading(false);

    getUser();

  }, []);



// Login function
  const login = async(email, password) => {
    const response = await userLogin(email, password);
    // checking the response and handling each authentication
    if(response.success){
        // if the response is success we setup the user using particular hook
        setUser(response.data.user);
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


  // update user function
  const updateUser = async(userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);
    // checking the response and handling each authentication
    if(response.success){
        // if the response is success we setup the user using particular hook
        setUser(response.data.user);
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


  // logout function
  const logout = () => {
    setUser(null);
    removeItemLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  // addFriends functions
  const updateUserFriends = (addFriend, friend) => {
    if(addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }

    const newFriends = user.friends.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );

    setUser({
      ...user,
      friends: newFriends,
    });
  }

  // here we are  returning all the function to call in other files.
  return {
    user,
    login, 
    logout, 
    loading,
    signup,
    updateUser,
    updateUserFriends
  }

};



//Post Provider Auth

export const usePosts = () => {
  return useContext(PostsContext);
}

export const useProviderPosts = () => {
  const [posts, setPosts] = useState(null);   
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
    const response = await getPosts();
    if( response.success){
        setPosts(response.data.posts);
    }
    setLoading(false);
    // console.log('response', response);
    };
    
    fetchPosts();

  }, []); 

  const addPostsToState = (post) => {
    const newPost = [post, ...posts];

    setPosts(newPost);
  }

  const addComment = (comment, postId) => {
    const newPost = posts.map((post) => {
      if(post._id === postId){
        return {
          ...post, 
          comments: [...post.comments, comment]
        };
      }
      return post;
    });

    setPosts(newPost);
  }

  return{
    data: posts,
    loading,
    addPostsToState,
    addComment
  };

}