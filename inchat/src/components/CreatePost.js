import { useState } from 'react';
import styles from '../styles/home.module.css';

const CreatePost = () => {
    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);

    const handleAddingPost = () => {


    }

    return(
        <div className={styles.createPost}>
            <textarea 
               className={styles.addPost} 
               value={post}
               onChange={(e) => setPost(e.target.value)}
            />

            <div>
                <button className={styles.addPostBtn} onClick={handleAddingPost} disabled={addingPost} >
                    {addingPost ?'Adding Post...' : 'Post Added'}
                </button>
            </div>

        </div>
    )
}


export default CreatePost;