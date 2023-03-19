import { createContext } from "react";
import { useProviderAuth } from "../hooks";


// here we are setting the initial state for the context
const initialState = {
    user: null,
    //creating some function
    login: () => {},
    logout: () => {},

    // creating loading state
    loading: true,
}   

export const AuthContext = createContext(initialState);

// creating another components
export const AuthProvider = ({children}) => {
    // all state are coming fomr another custom hooks that we are creating.
    const auth = useProviderAuth();

    // here we are returning provider followed by AuthContext and rendering the children
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>  // here auth is global state
}