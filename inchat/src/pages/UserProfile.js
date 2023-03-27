
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';

const UserProfile = () => {

  const [user, setUser] = useState({});
  const [loading, useLoading] = useState(true);
  const {userId} = useParams();

    // const location = useLocation();
    console.log('userId', userId);

    // const user = {};
    // const  {user = {} } = location.state;
 
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
        <button className={`button ${styles.saveBtn}`}>Add friend</button>

        <button className={`button ${styles.saveBtn}`}>Remove friend</button>
      </div>
    </div>
  );
};

export default UserProfile;
