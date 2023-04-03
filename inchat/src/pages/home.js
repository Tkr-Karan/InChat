import PropTypes from 'prop-types';
import Comment from '../components/Comment';
import Loader from '../components/loader';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api';
import styles from '../styles/home.module.css';
import FriendList from '../components/FriendList';
import { useAuth, usePosts } from '../hooks';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';

const Home = () =>{
       
    //also remove the post propas aargs
    // Adding the port hook here
    // const [posts, setPosts] = useState([]);
    // const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const posts = usePosts();


        // moving to the Post Providers
    // useEffect(() => {
    //     const fetchPosts = async () => {
    //     const response = await getPosts();
    //     if( response.success){
    //         setPosts(response.data.posts);
    //     }
    //     setLoading(false);
    //     // console.log('response', response);
    //     };
        
    //     fetchPosts();

    // }, [])   

    if(posts.loading){
        return <Loader />;
    }


    return(
        <div className={styles.home}>
            <div className={styles.postsList}>
            <CreatePost />
            {posts.data.map((post) =>(
                <Post post={post} key={`post-${post._id}`} />
                ))}
            </div>
            <div>
                {auth.user && <FriendList /> }
            </div>

        </div>
    )

};

// declaring the tell that which props property we are that passes as props
// we mentioned the proptypes in an object
// Home.propTypes = {
//     posts: PropTypes.array.isRequired,
// };


export default Home;