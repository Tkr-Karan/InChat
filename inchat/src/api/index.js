import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  console.log("token-->", token);
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error(this.props.url, error.toString());
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const login =  (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};

export const register =  (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { name, email, password, confirm_password: confirmPassword },
  });
};

export const editProfile = async (userId, name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: { id: userId, name, password, confirm_password: confirmPassword },
  });
};

export const fetchUserProfile = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: 'GET',
  });
};

export const fetchUserFriends = () => {
  return customFetch(API_URLS.friends(), {
    method: 'GET',
  });
};

export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: 'POST',
  });
};

export const removeFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: 'POST',
  });
};

export const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: 'POST',
    body: {
      content,
    },
  });
};

export const createComment = async (content, postId) => {
  return customFetch(API_URLS.comment(), {
    method: 'POST',
    body: {
      post_id: postId,
      content,
    },
  });
};

export const toggleLike = (itemId, itemType) => {
  return customFetch(API_URLS.toggleLike(itemId, itemType), {
    method: 'POST',
  });
};

export const searchUsers = (searchText) => {
  return customFetch(API_URLS.searchUsers(searchText), {
    method: 'GET',
  });
};






















// My Code


// import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from "../utils/constants";

// import { getFormBody } from "../utils";

// const customFetch = async (url, { body, ...customConfig}) => {
//     const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

//     // setting up the header
//     const headers = {
//         'content-type' : 'application/x-www-form-url-encoded', // this tupe of faormat browser want 
//         // we use upper code because we are not expecting Json

//         // 'content-type' : 'application/json',
//         // Accept : 'application/json'
//     };

//     //checking if their is any token present inside the body
//     if(token){
//         headers.Authorozation = `Bearer ${token}`;
//     }


//     //setting up the config
//     const config = {
//         //using spread operator
//         ...customConfig,
//         headers : {
//             ...headers,
//             ...customConfig.headers //special type of headers
//         },
//     };

//     if(body){
//         config.body = getFormBody(body); // ->>> this function are creating inside the index.js
//         // config.body = JSON.stringify(body);
//     }


//     try{
//         console.log(url);
//         // await is a asynchronous call to the function
//         const response = await fetch(url, config);
//         const data = await response.json();

//         //checking if response is success
//         if(data.success) {
//             return{
//                 data : data.data,
//                 success: true,
//             };
//         }

//         throw new Error(data.message);
//     }



//     catch (error){
//         console.log('error', error);

//         //if not success
//         return{
//             message : error.message,
//             success: false
//         };
    
//     }
// };

// export const getPosts = (page = 1  , limit = 5) => {
//     return customFetch(API_URLS.posts(page, limit), {
//         method : 'GET',
//     });
// };


// // create Login Function
// export const login = (email, password) => {
//     return customFetch(API_URLS.login(),{
//         method: "POST",
//         body: {email, password}
//     });
// }

// // create Register function
// export const register = async (name, email, password, confirmPassword) => {
//     return customFetch(API_URLS.signup(),{
//         method: "POST",
//         body: { name, email, password, confirm_password: confirmPassword}
//     });
// }