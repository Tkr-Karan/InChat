import styles from '../styles/home.module.css';

const Comment = ({comment}) => {

    return(
        // <div> Comments</div>
        <div className={styles.postCommentItem}>
            <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>{comment.user.name}</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>23</span>
            </div>

            <div className={styles.postCommentContent}>{comment.content}</div>
        </div>
    )
}

export default Comment;