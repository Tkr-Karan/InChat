import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createComment, toggleLike } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import Comment from './Comment';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Post = ({post}) => {
    const [comment, setComment] = useState('');
    const [creatingComment, setCreatingComment] = useState(false);
    const posts = usePosts();

    const handleAddComment = async (e) => {
        if (e.key === 'Enter') {
          setCreatingComment(true);
    
          const response = await createComment(comment, post._id);
    
          if (response.success) {
            setComment('');
            posts.addComment(response.data.comment, post._id);
            toast.success('Commented successfully!', {
              appearance: 'success',
            });
          } else {
            toast(response.message, {
              appearance: 'error',
            });
          }
    
          setCreatingComment(false);
        }
      };

    //   craeating the post like button function
      const handlePostLikeClick = async () => {
        const response = await toggleLike(post._id, 'Post');

        if (response.success) {
            
            if(response.data.deleted){
                toast.success('Like removed successfully!', {
                  appearance: 'success',
                });
            }else{
                toast.success("Like Added Successfully", {
                    appearance: "success",
                })
            }
        } else {
            toast(response.message, {
              appearance: 'error',
            });
          }
    
      }

    return(
        <div className={styles.postWrapper} key={`post-${post._id}`} >
            <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user-profile-pic"></img>

                    <div className={styles.postAuthor}>
                        <Link to={{
                            pathname: `/user/${post.user._id}`,
                        }}
                        
                        state = {{ user : post.user}}
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
                        <button onClick={handlePostLikeClick}>
                            <img src="https://cdn-icons-png.flaticon.com/512/535/535234.png" alt="like-icon"></img>
                        </button>
                        <span>{post.likes.length}</span>
                    </div>

                    <div className={styles.postCommentsIcon}>
                        <img src="https://cdn-icons-png.flaticon.com/512/13/13673.png" alt="comments-icon"></img>
                        <span>{post.comments.length}</span>
                    </div>
                </div>

                <div className={styles.postCommentBox}>
                    <input 
                        placeholder="start typing comment" 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={handleAddComment}
                    />
                </div>

                <div className={styles.postCommentsList}>
                    {post.comments.map((comment) => (
                        <Comment comment={comment} key={`post-comment-${comment._id}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}

Post.propTypes = {
    posts: PropTypes.object.isRequired,
};
  

export default Post;