import { useEffect, useState } from "react";
import { BrowserRouter,  Route, Routes } from "react-router-dom";


import {getPosts} from '../api';
import Home from '../pages/Home';
import Login from "../pages/Login";
import Loader from "./Loader";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import styles from '../styles/index.css';
import { useAuth } from "../hooks";
import Register from "../pages/Register";

// creating Components
const About = () => {
  return <h1> About </h1>;
}

const UserInfo = () => {
  return <h1> User </h1>;
}

const Page404 = () => {
  return <h1> 404!!, Page Not Found</h1>
}

function App() {
  const auth = useAuth();

  //this hook set in the Home.js
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();
  //     if( response.success){
  //       setPosts(response.data.posts);
  //     }
  //     setLoading(false);
  //     // console.log('response', response);
  //   };
  //   fetchPosts();

  // }, [])   

  if(auth.loading){
     return <Loader />
  }

  return (
    
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
      
            {/* <Route exact path="/" element={<Home posts={posts}/>}></Route> */}
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/sign-up" element={<Register />}></Route>
            <Route path="*" element={<Page404 />}></Route>
            
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
