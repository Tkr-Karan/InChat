import PropTypes from 'prop-types';
import Comment from '../components/Comment';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api';
import styles from '../styles/home.module.css';

const Home = () =>{

    //also remove the post propas aargs
    // Adding the port hook here
    const [posts, setPosts] = useState([]);
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

    }, [])   

    if(loading){
        return <Loader />;
    }


    return(
        <div className={styles.postsList}>
            {posts.map((post) =>(
                <div className={styles.postWrapper} key={`post-${post._id}`} >
                <div className={styles.postHeader}>
                    <div className={styles.postAvatar}>
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user-profile-pic"></img>

                        <div className={styles.postAuthor}>
                            <Link to={{
                                pathname: `/user/${post.user._id}`,
                            }}
                            
                            state = {{ user: post.user,}}
                                className={styles.postAuthor}>
                                    {post.user.name}
                            </Link>
                            <span className={styles.postTime}> a minute ago</span>
                        </div>
                    </div>

                    <div className={styles.postContent}>
                        {post.content}
                    </div>

                    <div className={styles.postActions}>
                        <div className={styles.postLike}>
                            <img src="https://cdn-icons-png.flaticon.com/512/535/535234.png" alt="like-icon"></img>
                            <span>5</span>
                        </div>

                        <div className={styles.postCommentsIcon}>
                            <img src="https://cdn-icons-png.flaticon.com/512/13/13673.png" alt="comments-icon"></img>
                            <span>3</span>
                        </div>
                    </div>

                    <div className={styles.postCommentBox}>
                        <input placeholder="start typing comment" />
                    </div>

                    <div className={styles.postCommentsList}>
                        <Comment />
                    </div>
                </div>
            </div>
            ))}
        </div>
    )

};

// declaring the tell that which props property we are that passes as props
// we mentioned the proptypes in an object
// Home.propTypes = {
//     posts: PropTypes.array.isRequired,
// };


export default Home;