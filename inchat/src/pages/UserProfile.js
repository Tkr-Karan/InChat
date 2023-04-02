
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import Loader from '../components/loader';

const UserProfile = () => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const {userId} = useParams();
  const auth = useAuth();



    // const location = useLocation();
    // console.log('userId', userId);

    const history = useNavigate();

    useEffect(() => {
      const getUser = async () => {
        const response = await fetchUserProfile(userId);
        if(response.success){
          console.log('response',response.data.user)
          setUser(response.data.user);
        }
        else{
          toast("respone.message", {
            apperance: 'error'
          });
  
          return history('/');
        }
      }


      getUser();

      setLoading(false);
    }, [userId, history, toast]);

    // const user = {};
    // const  {user = {} } = location.state;
 
  if(loading){
    return <Loader />
  }


  // checking the user friends
  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;
    console.log("friends", friends);

    const friendIds = friends.map(friend => friend.to_user._id);

    const index = friendIds.indexOf(userId);

    if(index !== -1){
      return true;
    }

    return false;
  }


  // creating addUser and Remove user function
  const handleRemoveUserClick = async () => {
    setRequestInProgress(true);
    
    const response = await removeFriend(userId);
    
    if(response.success){
      // const {friendship} = response.data;
      
      const friendship = auth.user.friends.filter((friend) => friend.to_user._id === userId );

      auth.updateUserFriends(false, friendship[0]);
      toast("user removed successfully", {
        apperance : 'success',
      });
    }else{
      toast(response.message, {
        apperance: 'error',
      });
    }
    
    setRequestInProgress(false);
  };

  const handleAddUserClick = async () => {
    setRequestInProgress(true);
    
    const response = await addFriend(userId);
    
    if(response.success){
      const {friendship} = response.data;

      auth.updateUserFriends(true, friendship);
      toast("user added successfully", {
        apperance : 'success',
      });
    }else{
      toast(response.message, {
        apperance: 'error',
      });
    }
    
    setRequestInProgress(false);

  };


  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>

        {checkIfUserIsAFriend() ? 
        <button 
          className={`button ${styles.saveBtn}`}
          onClick = {handleRemoveUserClick}
        >
          {requestInProgress ? 'Friend Removed' :'remove Friend ' }
        </button>
         : 
        <button 
          className={`button ${styles.saveBtn}`}
          onClick = {handleAddUserClick}
          disabled = {requestInProgress}
        >
          {requestInProgress ? 'Adding Friend...' : 'Add friend' }
          <ToastContainer />
        </button>
        }

        

        
      </div>
    </div>
  );
};

export default UserProfile;
