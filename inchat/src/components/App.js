import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import {getPosts} from '../api';
import Home from '../pages/Home';
import Login from "../pages/Login";
import Loader from "./loader";
import Navbar from "./Navbar";
import styles from '../styles/index.css';

const About = () => {
  return <h1> About </h1>;
}

const UserInfo = () => {
  return <h1> User </h1>;
}

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const fetchPosts = async () => {
      const response = await getPosts();

      if( response.success){
        setPosts(response.data.posts);
      }


      setLoading(false);
      console.log('response', response);
    };
 




    fetchPosts();

  }, [])   

  if(loading){
     return <Loader />
  }

  return (
    
    <div className="App">
      <Navbar />
      {/* <h1>Karan Kumar!!</h1> */}

      <Home posts={posts} />
      <Home />
      <Home />
    </div>
  );
}

export default App;
