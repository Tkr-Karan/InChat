import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from "../utils/index";


const customFetch = async (url, { body, ...customConfig}) => {
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    // setting up the header
    const headers = {
        'content-type' : 'application/json',
        Accept : 'application/json'
    };

    //checking if their is any token present inside the body
    if(token){
        headers.Authorozation = `Bearer ${token}`;
    }


    //setting up the config
    const config = {
        //using spread operator
        ...customConfig,
        headers : {
            ...headers,
            ...customConfig.headers //special type of headers
        },
    };

    if(body){
        config.body = JSON.stringify(body);
    }


    try{
        // await is a asynchronous call to the function
        const response = await fetch(url, config);
        const data = await response.json();

        //checking if response is success
        if(data.success) {
            return{
                data : data.data,
                success: true,
            };
        }

        throw new Error(data.message);
    }



    catch (error){
        console.log('error', error);

        //if not success
        return{
            message : error.message,
            success: false
        };
    
    }
};

export const getPosts = (page = 1  , limit = 5) => {
    return customFetch(API_URLS.posts(page, limit), {
        method : 'GET',
    });
};