import { useEffect, useState } from "react";
import {getPosts} from '../api';
import Home from '../pages/home';
import Loader from "./loader";
import Navbar from "./Navbar";
import styles from '../styles/index.css';



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
