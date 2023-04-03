import { createContext } from "react";
import { useProviderPosts } from "../hooks";


// here we are setting the initial state for the context
const initialState = {
    posts: [],
    loading: true,
    addPostsToState : () => {},
}   

export const PostsContext = createContext(initialState);

// creating another components
export const PostsProvider = ({children}) => {
    // all state are coming fomr another custom hooks that we are creating.
    const posts = useProviderPosts();

    // here we are returning provider followed by AuthContext and rendering the children
    return <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>  // here auth is global state
}