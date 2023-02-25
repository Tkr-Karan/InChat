import styles from '../styles/home.module.css';

const Comment = () => {

    return(
        <div className={styles.postCommentItem}>
            <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>Karan</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>23</span>
            </div>

            <div className={styles.postCommentContent}>Random comment</div>
        </div>
    )
}

export default Comment;