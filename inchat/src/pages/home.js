import Comment from '../components/Comment';

import styles from '../styles/home.module.css';

const Home = () =>{
    return(
        <div className="post-list">
            <div className={styles.postWrapper}>
                <div className={styles.postHeader}>
                    <div className={styles.postAvatar}>
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user-profile-pic"></img>

                        <div className={styles.postAuthor}>
                            <span className={styles.postAuthor}>Karan kr</span>
                            <span className={styles.postTime}> a minute ago</span>
                        </div>
                    </div>

                    <div className={styles.postContent}>
                        Post Content
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
        </div>
    )

};


export default Home;