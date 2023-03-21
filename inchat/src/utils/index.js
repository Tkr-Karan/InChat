export * from './constants';

// setting up the function which help us to getting ot setting the token from the local storage.

// setItem function
export const setItemLocalStorage = ( key, value) => {
    if(!key || !value){
        return  console.error("cannot store in LS");
    }

    // if we find the key and value then check the format and use Json Stringyfy
    const valuetoStore = typeof value !== 'string' ? JSON.stringify(value) : value;

    localStorage.setItem(key, valuetoStore);
};

// get value function
export const getItemLocalStorage = ( key) => {
    if(!key){
        return  console.error("cannot get the value in LS");
    }
    localStorage.getItem(key);
};

// remove function
export const removeItemLocalStorage = ( key) => {
    if(!key ){
        return  console.error("cannot store value in LS");
    }

    return localStorage.removeItem(key);
};


// export const getFormBody = (params) => {
//     let formBody = [];
  
//     for (let property in params) {
//       let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
//       let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123
  
//       formBody.push(encodedKey + '=' + encodedValue);
//     }
  
//     return formBody.join('&'); // 'username=aakash&password=123213'
//   };

export const getFormBody = (params) => {
    let formBody = [];

    for(let property in params){
        let encodeKey = encodeURIComponent(property);
        let encodeValue = encodeURIComponent(params[property]);


        formBody.push(encodeKey + "=" + encodeValue);
    }  
        return formBody.join('&');  //username=karankumar&password=123321
    
};