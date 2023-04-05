import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';
import { useState } from 'react';


const Navbar = () => {

  const [result, setResult] = useState([]);
  const [searchText, setSearchText] = useState('');
  // adding auth so we can display the user if it successfully authenticatte
  const auth = useAuth();
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img
            alt="Inchat"
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </a>
      </div>

      <div>

      </div>
 
      <div className={styles.rightNav}>
        {/* checking is the user exist or not */}
        { auth.user && ( <div className={styles.user}>
          <Link to="/user-settings">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt=""
              className={styles.userDp}
            />
          </Link>
          <span>{auth.user.name}</span>
        </div> 
        )}
        <div className={styles.navLinks}>
          <ul>
            {/* putting the conditon if the user is exit then show Logout otherwise show Login as well as Register */}
          {auth.user ? (
            <>
              <li onClick={auth.logout}>
                LogOut 
                {/* <a href="/">Log in</a> */}
              </li>
            </>
          ): (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/sign-up">Register</Link>
              </li>
            </>
          )}
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
