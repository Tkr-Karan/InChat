import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePosts } from '../hooks';


const CreatePost = () => {
    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);
    const posts = usePosts();

    const handleAddingPost = async () => {
        setAddingPost(true);

        const response = await addPost(post);
        if(response.success){
            setPost('');
            posts.addPostsToState(response.data.post);
            toast.success('post added successfully',{
                apperance: 'success',
            });
        }
        else{
            toast(response.message,{
                apperance: 'error',
            })
        }

        setAddingPost(false);
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
                    <ToastContainer />
                </button>
            </div>

        </div>
    )
}


export default CreatePost;